"use client";

import { Form, Formik, FormikHelpers } from "formik";
import AuthFormWrapper from "./auth.form.wrapper";
import Link from "next/link";
import { Button, FloatingLabel, Spinner } from "flowbite-react";
import ValidationText from "../../../../components/form/validation.text";
import { authSchema } from "../validations/auth.schema";
import { backendlessLogin } from "@/libs/backendless/backendless.auth";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/auth.context";

export interface SignInFormData {
  email: string;
  password: string;
}

function SignInForm() {
  const auth = useAuth();
  const handleSubmit = async (
    data: SignInFormData,
    helper: FormikHelpers<SignInFormData>,
  ) => {
    try {
      const { email, password } = data;
      const user = await backendlessLogin(email, password);
      if (user) {
        auth?.signIn(user);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message
          : error instanceof Error
            ? `Login Failed: ${error.message}`
            : "Login failed. Please try again.",
      );
    } finally {
      helper.resetForm();
    }
  };
  return (
    <AuthFormWrapper>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={authSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, getFieldProps, isSubmitting, errors, touched }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h1 className="text-xl font-bold text-white">Sign In</h1>
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Spinner
                  size="sm"
                  aria-label="Info spinner example"
                  className="me-3"
                  light
                />
              ) : null}
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </Form>
        )}
      </Formik>
      <p className="mt-4 text-sm text-gray-400">
        Don&apos;t have an account yet?{" "}
        <Link href="/sign-up" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthFormWrapper>
  );
}
export default SignInForm;
