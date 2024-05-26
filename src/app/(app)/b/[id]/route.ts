import { eq } from 'drizzle-orm';
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

import { UPLOAD_DIR } from '@/app/api/upload/route';
import { db } from '@/db';
import { builds } from '@/db/schema';

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (request: Request, { params }: Params) => {
  const build = await db.query.builds.findFirst({
    where: eq(builds.id, params.id),
  });

  if (!build) {
    return new NextResponse('Build not found', { status: 404 });
  }

  const directory = path.join(UPLOAD_DIR, build.projectId, build.id);

  if (!fs.existsSync(directory)) {
    return new Response('No Development build found', { status: 404 });
  }

  const files = fs.readdirSync(directory);

  const headers = new Headers();

  headers.set('Content-Type', 'application/octet-stream');

  switch (build.platform) {
    case 'ios': {
      const iosBuild = files.find((file) => file.endsWith('.ipa'));
      if (!iosBuild) {
        return new Response('No iOS development build found', { status: 404 });
      }
      const size = fs.statSync(path.join(directory, iosBuild)).size;
      headers.set('Content-Disposition', `attachment; filename=${iosBuild}`);
      headers.set('Content-Length', size.toString());
      const content = fs.readFileSync(path.join(directory, iosBuild));

      return new Response(content, { headers });
    }
    case 'android': {
      const androidBuild = files.find((file) => file.endsWith('.apk'));
      if (!androidBuild) {
        return new Response('No Android development build found', {
          status: 404,
        });
      }
      const size = fs.statSync(path.join(directory, androidBuild)).size;
      headers.set(
        'Content-Disposition',
        `attachment; filename=${androidBuild}`
      );
      headers.set('Content-Length', size.toString());
      const content = fs.readFileSync(path.join(directory, androidBuild));

      return new Response(content, { headers });
    }
  }

  return new Response('Hello worker!', { status: 200 });
};
