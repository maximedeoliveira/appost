import { and, eq } from 'drizzle-orm';
import { EllipsisVerticalIcon, QrCodeIcon } from 'lucide-react';
import React from 'react';

import { auth } from '@/auth';
import QrCodeModal from '@/components/dashboard/Build/QrCodeModal';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/db';
import { builds, projects } from '@/db/schema';

type BuildListProps = {
  projectId: string;
};

const getBuilds = async ({ projectId }: { projectId: string }) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  return db
    .select({
      id: builds.id,
      platform: builds.platform,
      version: builds.version,
      createdAt: builds.createdAt,
    })
    .from(builds)
    .innerJoin(projects, and(eq(projects.userId, session.user.id)))
    .where(eq(builds.projectId, projectId));
};

const BuildList = async (props: BuildListProps) => {
  const builds = await getBuilds({ projectId: props.projectId });

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Platform</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Environment</TableHead>
            <TableHead className="text-right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {builds.map((build) => (
            <TableRow key={build.id}>
              <TableCell className="font-medium">{build.platform}</TableCell>
              <TableCell>{build.version}</TableCell>
              <TableCell>{build.createdAt}</TableCell>
              <TableCell className="flex items-center justify-end gap-2">
                <QrCodeModal buildId={build.id}>
                  <Button variant="ghost" size="icon">
                    <QrCodeIcon className="w-5 h-5" />
                  </Button>
                </QrCodeModal>
                <Button variant="ghost" size="icon">
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BuildList;
