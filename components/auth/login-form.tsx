"use client"
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { LoginSchema } from '@/schemas';
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
import { FormSuccess } from '@/components/form-success';
import { login } from '@/actions/login';
import { useState, useTransition } from 'react';

export const LoginForm = () => {

  const [error, setError ] = useState<string | undefined>();
  const [success, setSuccess ] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {

    setError("")
    setSuccess("")

    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)
        })
    })
  }

  return (
    <CardWapper 
     headerLabel="Welcome back"
     backButtonLabel="Don't have an account"
     backButtonHref="/auth/register"
     showSocial>
      
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4'>
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
          {isPending ? <FaSpinner className="animate-spin" /> : "Login"}
          </Button>
        </div>
      </form>
    </Form>

    </CardWapper>
  )
}