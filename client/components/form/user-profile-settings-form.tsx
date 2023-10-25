"use client"

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import fetchClient from "@/lib/user";

const profileFormSchema = z.object({
  displayname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(30, {
    message: "Username must not be longer than 30 characters.",
  }),
  email: z.string({
    required_error: "Please select an email to display.",
  }).email(),
  bio: z.string().max(225)
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  const fetchUserData = async () => {
    try {
      const response = await fetchClient(`${url}/user/profile`, {
        method: "GET",
      });
      const userData = await response?.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  const defaultValues: Partial<ProfileFormValues> = {
    displayname: user ? user.name : "",
    email: user ? user.email : "",
    bio: user ? user.bio || "" : "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);

    const profile = {
      name: data.displayname,
      email: data.email,
      bio: data.bio,
    };

    try {
      const result = await fetchClient(`${url}/user/profile`, {
        method: "PATCH",
        body: JSON.stringify(profile),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result?.ok) {
        const errorData = await result?.json();
        toast({
          title: "Error",
          description: errorData.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated!",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
        form.reset({
            displayname: user.name,
            email: user.email,
            bio: user.bio || "",
        });
    }
  }, [user, form]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="displayname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="Display Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Email" {...field} disabled />
                <FormDescription>
                  This is the email address that will be used to log in to your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations to link to them.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
