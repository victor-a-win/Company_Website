"use client";

import IPost from "@/model/post.model";
import {
  Button,
  CloseIcon,
  FileInput,
  FloatingLabel,
  HelperText,
  Label,
  Textarea,
} from "flowbite-react";
import { useFormikContext } from "formik";
import ValidationText from "../form/validation.text";
import slug from "slug";
import { useEffect } from "react";
import Image from "next/image";

const BlogFormStructure = () => {
  const {
    values,
    getFieldProps,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
  } = useFormikContext<IPost>();

  useEffect(() => {
    setFieldValue("slug", slug(values.title));
  }, [setFieldValue, values.title]);

  return (
    <section className="flex flex-col gap-4">
      <div>
        <FloatingLabel
          id="title"
          label="Title"
          variant="outlined"
          {...getFieldProps("title")}
          disabled={isSubmitting}
          color={touched?.title && errors?.title ? "error" : "default"}
        />
        <ValidationText touched={touched?.title} error={errors?.title} />
      </div>
      <div>
        <FloatingLabel
          id="slug"
          label="Slug"
          variant="outlined"
          value={values.slug}
          disabled
        />
      </div>
      <div>
        {values.image || values.imageUrl ? (
          <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
            <Button
              type="button"
              color="alternative"
              disabled={isSubmitting}
              onClick={() => setFieldValue("image", null)}
              className="absolute top-2 right-2 z-10 flex size-10 items-center justify-center p-0"
            >
              <CloseIcon className="size-5" />
            </Button>
            <Image
              src={
                values.image
                  ? URL.createObjectURL(values.image)
                  : values.imageUrl || ""
              }
              alt="Uploaded Image"
              fill
              className="object-cover"
              placeholder="empty"
            />
          </div>
        ) : null}
        <Label className="mb-2 block" htmlFor="image">
          Article Image
        </Label>
        <FileInput
          id="image"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          disabled={isSubmitting}
          onChange={(e) => {
            const file = e.currentTarget.files?.[0] || null;
            setFieldValue("image", file);
          }}
          color={errors?.image ? "failure" : "gray"}
        />
        <HelperText>*Max size 1MB</HelperText>
        {errors?.image ? (
          <HelperText color="failure">{errors.image}</HelperText>
        ) : null}
      </div>
      <div>
        <FloatingLabel
          id="excerpt"
          label="Excerpt"
          variant="outlined"
          {...getFieldProps("excerpt")}
          disabled={isSubmitting}
          color={touched?.excerpt && errors?.excerpt ? "error" : "default"}
        />
        <ValidationText touched={touched?.excerpt} error={errors?.excerpt} />
      </div>
      <div className="max-w-full">
        <div className="mb-2 block">
          <Label htmlFor="content">Content</Label>
        </div>
        <Textarea
          id="content"
          placeholder="Leave a content..."
          {...getFieldProps("content")}
          disabled={isSubmitting}
          color={touched?.content && errors?.content ? "failure" : "gray"}
          required
          rows={10}
        />
        <ValidationText touched={touched?.content} error={errors?.content} />
      </div>
    </section>
  );
};

export default BlogFormStructure;
