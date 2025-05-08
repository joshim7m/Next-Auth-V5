"use client"
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { RegisterSchema } from '@/schemas';
import { CardWapper } from "@/components/card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaSpinner } from 'react-icons/fa';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { register } from '@/actions/register';
import { FormSuccess } from '@/components/form-success';
import { useState, useTransition } from 'react';

export const RegisterForm = () => {

  const [error, setError ] = useState<string | undefined>();
  const [success, setSuccess ] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

    setError("")
    setSuccess("")

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)
        })
    })
  }

  return (
    <CardWapper 
     headerLabel="Create an account"
     backButtonLabel="Already have an account?"
     backButtonHref="/auth/login"
     showSocial>
      
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Joshim'
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          >
          </FormField>

          <FormField
          control={form.control}
          name='email'
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='joshim@exe.com'
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          >
          </FormField>

          <FormField
          control={form.control}
          name='password'
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='*****'
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem> 
          )}
          >
          </FormField>
          <div>
            <FormSuccess message={success} />
            <FormError message={error} />
          </div>
          <Button disabled={isPending} type='submit' className='w-full'>
          {isPending ? <FaSpinner className="animate-spin" /> : "Register"}
          </Button>
        </div>
      </form>
    </Form>

    </CardWapper>
  )
}