'use server';

import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { db } from '@/db';
import { projects } from '@/db/schema';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const createProject = async (data: { name: string }) => {
  console.log('Creating project', data);
  await delay(4000);

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
