import { eq } from 'drizzle-orm';
import fs from 'fs';
import JSZip from 'jszip';
import { NextResponse } from 'next/server';
import path from 'path';

import { db } from '@/db';
import { builds, projects } from '@/db/schema';
import { ManifestParser } from '@/utils/extract-tools/manifest';
import { parsePlist } from '@/utils/extract-tools/plist-parse';

const ALLOWED_EXTENSIONS = ['apk', 'ipa'];
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const POST = async (req: Request) => {
  const formData = await req.formData();

  const apiKey = req.headers.get('x-api-key');

  if (!apiKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const project = await db.query.projects.findFirst({
    where: eq(projects.uploadKey, apiKey),
  });

  if (!project) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const file = formData.get('artifact');

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const extension = file.name.split('.').pop();
  if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
    return NextResponse.json(
      {
        message: `Invalid file extension, only ${ALLOWED_EXTENSIONS.join(
          ', '
        )} are allowed`,
      },
      { status: 400 }
    );
  }

  const artifactFile = await file.arrayBuffer();
  const fileBuffer = Buffer.from(artifactFile);

  const dirPath = path.join(UPLOAD_DIR, project.id);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  switch (extension) {
    case 'apk': {
      const archive = await JSZip.loadAsync(fileBuffer);

      const manifestBuffer = await archive
        .file('AndroidManifest.xml')
        ?.async('arraybuffer');
      if (!manifestBuffer) {
        return NextResponse.json(
          { message: 'Invalid APK file, no AndroidManifest.xml found' },
          { status: 400 }
        );
      }

      const manifest = new ManifestParser(Buffer.from(manifestBuffer)).parse();
      const versionCode = manifest.versionCode as number | undefined;
      const packageName = manifest.package as string | undefined;

      if (!versionCode || !packageName) {
        return NextResponse.json(
          { message: 'Invalid APK file, no versionCode or package name found' },
          { status: 400 }
        );
      }

      const build = await db
        .insert(builds)
        .values({
          projectId: project.id,
          platform: 'android',
          version: versionCode.toString(),
        })
        .returning();

      // write new apk file
      const destination = path.join(dirPath, build[0].id);

      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
      }

      fs.writeFileSync(path.join(destination, `android.apk`), fileBuffer);
      // write metadata
      fs.writeFileSync(
        path.join(destination, `metadata.android.json`),
        JSON.stringify(manifest, null, 2)
      );

      return NextResponse.json(`http://localhost:3000/`);
    }

    case 'ipa': {
      const archive = await JSZip.loadAsync(fileBuffer);

      const rawInfoPlist = await archive
        .file(/Payload\/[^/]+\/Info.plist/)[0]
        ?.async('uint8array');

      if (!rawInfoPlist) {
        return NextResponse.json(
          { message: 'Invalid IPA file, no Info.plist found' },
          { status: 400 }
        );
      }

      const plist = parsePlist(rawInfoPlist) as
        | Record<string, unknown>
        | undefined;

      if (typeof plist !== 'object') {
        return NextResponse.json(
          { message: 'Invalid IPA file, Info.plist is not a valid plist' },
          { status: 400 }
        );
      }

      const version = plist.CFBundleVersion as string | undefined;
      const bundleId = plist.CFBundleIdentifier as string | undefined;

      if (!version || !bundleId) {
        return NextResponse.json(
          {
            message:
              'Invalid IPA file, no CFBundleVersion or CFBundleIdentifier found',
          },
          { status: 400 }
        );
      }

      const build = await db
        .insert(builds)
        .values({
          projectId: project.id,
          platform: 'ios',
          version,
        })
        .returning();

      // write new ipa file
      const destination = path.join(dirPath, build[0].id);

      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
      }

      fs.writeFileSync(path.join(destination, `ios.ipa`), fileBuffer);

      // write metadata
      fs.writeFileSync(
        path.join(destination, `metadata.ios.json`),
        JSON.stringify(plist, null, 2)
      );

      return NextResponse.json(`http://localhost:3000`);
    }
  }
};
