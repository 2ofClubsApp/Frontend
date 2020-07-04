import * as React from "react";
import {FormikErrors, FormikValues} from "formik";

export type FormInfo = {
    type: "text" | "email" | "password"
    name: string
    placeholder: string
}

export const userLabel: FormInfo = {

    type: "text",
    name: "username",
    placeholder: "Username"

}
export const emailLabel: FormInfo = {
    type: "text",
    name: "email",
    placeholder: "Email"
};
export const passLabel: FormInfo = {
    type: "password",
    name: "password",
    placeholder: "Password"
};
export const passConfirmLabel: FormInfo = {
    type: "password",
    name: "passwordConfirm",
    placeholder: "Confirm Password"
};

export type FormLabel = {
    key?: number
    type: "text" | "email" | "password"
    name: string
    placeholder: string
    values: any
    errors: FormikErrors<FormikValues>
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement>
}
