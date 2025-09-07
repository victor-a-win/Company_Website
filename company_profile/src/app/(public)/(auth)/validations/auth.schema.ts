import * as Yup from "yup";

const authSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

const signUpSchema = Yup.object().shape({
  name: Yup.string().min(2).max(100).required("Name is required"),
  ...authSchema.fields,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Password Must Match")
    .required("Confirm Password is required"),
});

export { authSchema, signUpSchema };
