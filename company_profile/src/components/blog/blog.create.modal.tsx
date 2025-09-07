"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "flowbite-react";
import { Form, Formik, FormikHelpers } from "formik";
import BlogFormStructure from "./blog.form.struct";
import modalTheme from "@/theme/modal.theme";
import { postSchema } from "@/app/(private)/dashboard/validations/post.schema";
import IPost, { TPostPayload } from "@/model/post.model";
import {
  backendlessUploadSingleImage,
  createBackendlessPost,
  setBackendlessPostAuthorRelation,
} from "@/libs/backendless/backendless.posts";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/auth.context";
import { nanoid } from "nanoid";

type Props = {
  openModal: boolean;
  onClose: () => void;
};

export function BlogCreateModal({ openModal, onClose }: Props) {
  const router = useRouter();
  const auth = useAuth();
  const uniqueId = nanoid();
  const handleSubmit = async (data: IPost, helpers: FormikHelpers<IPost>) => {
    try {
      const { image, ...rest } = data;
      const backendlessFileUrl = (await backendlessUploadSingleImage(
        image,
        uniqueId,
      )) as string;
      const payload: TPostPayload = {
        ...rest,
        imageUrl: backendlessFileUrl as string,
        ownerId: auth?.user?.objectId as string,
      };
      const post = await createBackendlessPost(payload);
      if (post) {
        await setBackendlessPostAuthorRelation(post.objectId, post.ownerId);
      }
      router.refresh();
      toast.success("Post created successfully");
      onClose();
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message
          : error instanceof Error
            ? `Create Post Failed: ${error.message}`
            : "Create Post failed. Please try again.",
      );
    } finally {
      helpers.resetForm();
    }
  };
  return (
    <Modal
      theme={modalTheme.modal}
      dismissible
      show={openModal}
      onClose={onClose}
    >
      <Formik<IPost>
        initialValues={{
          title: "",
          slug: "",
          image: null,
          imageUrl: "",
          ownerId: "",
          excerpt: "",
          content: "",
        }}
        validationSchema={postSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm, isSubmitting }) => (
          <Form>
            <ModalHeader>Create Post</ModalHeader>
            <ModalBody>
              <BlogFormStructure />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" pill disabled={isSubmitting}>
                {isSubmitting ? <Spinner className="size-5" /> : null}
                {isSubmitting ? "Creating..." : "Submit"}
              </Button>
              <Button
                pill
                color="red"
                outline
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
