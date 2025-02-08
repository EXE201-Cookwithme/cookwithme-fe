"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Props = {};
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  content: z.string().min(50, {
    message: "Content must be at least 50 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  image: z.any().refine((files) => files.length > 0, "Image is required."),
});
const Page = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    console.log(values);
    form.reset();
    setPreviewImage(null);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[60%] mx-auto py-6">
      <div className="py-8">
        <p className="text-4xl font-bold">Create post</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter article title" {...field} />
                </FormControl>
                <FormDescription>
                  This will be the main title of your article.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write a brief description of your article"
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A short summary of your article. This will appear in article
                  previews.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your article content here"
                    className="resize-none"
                    rows={10}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The main body of your article. Minimum 50 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="politics">Politics</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the most relevant category for your article.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      onChange(e.target.files);
                      handleImageChange(e);
                    }}
                    {...rest}
                  />
                </FormControl>
                <FormDescription>
                  Upload a cover image for your article.
                </FormDescription>
                <FormMessage />
                {previewImage && (
                  <img
                    src={previewImage || "/placeholder.svg"}
                    alt="Preview"
                    className="mt-2 rounded-md max-w-xs"
                  />
                )}
              </FormItem>
            )}
          />
          <Button disabled={true}>
            {isSubmitting ? "Submitting..." : "Submit Article"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
