'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React, { PropsWithChildren, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type AddProjectModalProps = PropsWithChildren;

const AddProjectFormSchema = z.object({
  name: z.string().min(1),
});

type AddProjectForm = z.infer<typeof AddProjectFormSchema>;

const AddProjectModal = (props: AddProjectModalProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<AddProjectForm>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(AddProjectFormSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      await createProject(data);
    });
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Add a project</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Appost" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectModal;
