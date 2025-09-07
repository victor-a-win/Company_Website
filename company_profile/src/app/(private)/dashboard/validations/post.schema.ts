import * as Yup from "yup";

const sharedSchema = {
  title: Yup.string().required("Title is required"),
  slug: Yup.string().required("Slug is required"),
  excerpt: Yup.string().required("Excerpt is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileSize",
      "Image size must be less than 1MB",
      (value) => !value || (value instanceof File && value.size <= 1024 * 1024),
    ),
  content: Yup.string()
    .min(100, "Content must be at least 100 characters")
    .max(5000, "Content must be at most 5000 characters")
    .required("Content is required"),
};

const postSchema = Yup.object().shape({
  ...sharedSchema,
});

const editPostSchema = Yup.object().shape({
  ...sharedSchema,
  image: Yup.mixed()
    .nullable()
    .optional()
    .test(
      "fileSize",
      "Image size must be less than 1MB",
      (value) => !value || (value instanceof File && value.size <= 1024 * 1024),
    ),
});

export { postSchema, editPostSchema };
