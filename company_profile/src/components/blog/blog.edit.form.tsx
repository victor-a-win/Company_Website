"use client";

import { editPostSchema } from "@/app/(private)/dashboard/validations/post.schema";
import IPost, { IPostResponse, TPostPayload } from "@/model/post.model";
import { Form, Formik, FormikHelpers } from "formik";
import BlogFormStructure from "./blog.form.struct";
import { Button, Spinner } from "flowbite-react";
import { toast } from "sonner";
import axios from "axios";
import {
  backendlessUploadSingleImage,
  editBackendlessPost,
} from "@/libs/backendless/backendless.posts";
import { useRouter } from "next/navigation";

type Props = {
  post: IPostResponse | undefined;
};
const BlogEditForm = ({ post }: Props) => {
  const router = useRouter();
  const handleSubmit = async (data: IPost, helpers: FormikHelpers<IPost>) => {
    try {
      const { image, ...rest } = data;
      const payload: TPostPayload = rest;
      if (image) {
        const backendlessFileUrl = (await backendlessUploadSingleImage(
          image,
          data.imageUrl.split("/").pop() || "",
          true,
        )) as string;
        payload.imageUrl = backendlessFileUrl as string;
      }
      await editBackendlessPost(payload, post?.objectId || "");
      router.push("/dashboard");
      toast.success("Post updated successfully");
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message
          : error instanceof Error
            ? `Update Post Failed: ${error.message}`
            : "Update Post failed. Please try again.",
      );
    } finally {
      helpers.resetForm();
    }
  };
  return (
    <Formik<IPost>
      initialValues={{
        title: post?.title || "",
        slug: post?.slug || "",
        excerpt: post?.excerpt || "",
        image: null,
        imageUrl: post?.imageUrl || "",
        ownerId: post?.ownerId || "",
        content: post?.content || "",
      }}
      validationSchema={editPostSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <BlogFormStructure />
          <hr className="my-4 border-gray-300" />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Spinner className="mr-2 size-5" /> : null}
            {isSubmitting ? "Updating..." : "Submit"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default BlogEditForm;
