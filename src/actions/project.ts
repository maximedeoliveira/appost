'use server';

import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { db } from '@/db';
import { projects } from '@/db/schema';

export const createProject = async (data: { name: string }) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const project = await db
    .insert(projects)
    .values({ userId: session.user.id, name: data.name })
    .returning();

  redirect(`/dashboard/${project[0].id}`);
};
