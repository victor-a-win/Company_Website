"use client";

import { Button, FloatingLabel, Spinner } from "flowbite-react";
import { Form, Formik, FormikHelpers } from "formik";
import { signUpSchema } from "../validations/auth.schema";
import ValidationText from "../../../../components/form/validation.text";
import { backendlessRegister } from "@/libs/backendless/backendless.auth";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthFormWrapper from "./auth.form.wrapper";

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// type Props = {};
const SignUpForm = () => {
  const router = useRouter();
  const handleSubmit = async (
    data: SignUpFormData,
    helper: FormikHelpers<SignUpFormData>,
  ) => {
    const { email, password, name } = data;
    try {
      await backendlessRegister(name, email, password);
      toast.success("Registration successful!");
      router.push("/sign-in");
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : "Registration failed. Please try again.",
      );
    } finally {
      helper.resetForm();
    }
  };

  return (
    <AuthFormWrapper>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, getFieldProps, isSubmitting, errors, touched }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h1 className="text-xl font-bold text-white">Sign Up</h1>
            <div>
              <FloatingLabel
                id="name"
                label="Name"
                variant="outlined"
                {...getFieldProps("name")}
                disabled={isSubmitting}
                color={touched?.name && errors?.name ? "error" : "default"}
              />
              <ValidationText touched={touched?.name} error={errors?.name} />
            </div>
            <div>
              <FloatingLabel
                id="email"
                label="Email"
                variant="outlined"
                {...getFieldProps("email")}
                disabled={isSubmitting}
                color={touched?.email && errors?.email ? "error" : "default"}
              />
              <ValidationText touched={touched?.email} error={errors?.email} />
            </div>
            <div>
              <FloatingLabel
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                {...getFieldProps("password")}
                disabled={isSubmitting}
                color={
                  touched?.password && errors?.password ? "error" : "default"
                }
              />
              <ValidationText
                touched={touched?.password}
                error={errors?.password}
              />
            </div>
            <div>
              <FloatingLabel
                id="confirm-password"
                label="Confirm Password"
                type="password"
                variant="outlined"
                {...getFieldProps("confirmPassword")}
                disabled={isSubmitting}
                color={
                  touched?.confirmPassword && errors?.confirmPassword
                    ? "error"
                    : "default"
                }
              />
              <ValidationText
                touched={touched?.confirmPassword}
                error={errors?.confirmPassword}
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Spinner
                  size="sm"
                  aria-label="Info spinner example"
                  className="me-3"
                  light
                />
              ) : null}
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
      <p className="mt-4 text-sm text-gray-400">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </p>
    </AuthFormWrapper>
  );
};
export default SignUpForm;
