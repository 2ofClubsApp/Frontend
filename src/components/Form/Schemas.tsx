import * as Yup from "yup";

export const signUpSchema = Yup.object({
    username: Yup.string()
        .required("Username is a required field")
        .min(2, "Minimum username length is 2 characters")
        .max(15, "Maximum username length is 15 characters"),
    email: Yup.string()
        .email("Enter a valid email address")
        .required("Email is a required field"),
    password: Yup.string()
        .required("Password is a required field")
        // .min(7, "Minimum password length must be 7 characters")
        // .min(20, "Maximum password length must be 20 characters "),
        .oneOf([Yup.ref('passwordConfirm')], "Passwords must be the same"),
    passwordConfirm: Yup.string()
        .required("Confirm Password is a required field")
        .oneOf([Yup.ref('password')], "Passwords must be the same"),
});

export const loginSchema = Yup.object({
    username: Yup.string()
        .required("Email is a required field"),
    password: Yup.string()
        .required("Password is a required field")
});
