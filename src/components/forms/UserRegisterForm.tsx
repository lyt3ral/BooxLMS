"use client";
//todo: validate repeat password
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

export function RegisterForm({ className }: { className?: string }) {
  // STATE
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // QUERIES
  const register = api.user.create.useMutation();

  const RegisterFormSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8),
  });

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
  });

  async function onSubmit(data: z.infer<typeof RegisterFormSchema>) {
    if (data.password !== data.repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log(data);
    setIsLoading(true);
    try {
      const res = await register.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
        repeatPassword: data.repeatPassword,
      });

      if (res) {
        toast.success("Registered Successfully");
        router.push("/login");
      } else toast.error("Something went wrong. Try again in some time.");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className={cn("mx-6  mt-4 p-4 md:m-8", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-1"
        >
          <FormLabel className="font-display mb-1 text-3xl text-primary">
            Register
          </FormLabel>
          <FormDescription className="mb-3">
            Submit details get started with your account.
          </FormDescription>

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="flex">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                      <Mail className="stroke-muted-foreground" size={16} />
                    </span>
                    <Input type="email" placeholder="Email" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Repeat Password */}
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Repeat Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="p-0.5" />

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>

          <p>
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </Card>
  );
}
