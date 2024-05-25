'use client';

import { LayoutIcon, Loader2 } from 'lucide-react';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { createProject } from '@/actions/project';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const NoProject = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm();

  console.log(form.formState.errors);

  const onSubmit = form.handleSubmit((data) => {
    console.log('alllo');
    startTransition(async () => {
      await createProject(data);
    });
  });

  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <div className="inline-flex flex-col items-center gap-2">
        <div>
          <div className="inline-flex p-3 rounded-md bg-primary/30">
            <LayoutIcon className="text-primary" />
          </div>
        </div>
        <p className="text-md font-bold">
          You don&apos;t have any project yet !
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">Add a project</Button>
          </DialogTrigger>
          <DialogContent>
            <Form {...form}>
              <form onSubmit={onSubmit}>
                <DialogHeader>
                  <DialogTitle>Add a project</DialogTitle>
                </DialogHeader>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">
                    {isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default NoProject;
