import React, {useState, useEffect} from 'react'
import {ToggleButton, Container, Row, Image, Form, Modal} from "react-bootstrap";
import styles from "./ResetPasswordForm.module.css"
import TagsContainer from "../TagsContainer/TagListing"
import {Formik} from "formik";
import * as yup from "yup";
import axios from "../../axios";
import {resetPasswordSchema} from "../Form/Schemas";
import {FormInfo, passLabel, userLabel} from "../../types/FormInfo";
import Label from "../Form/Label";
import FormContainer from "../Form/FormContainer";
import FormButton from "../Form/FormButton";
import {useHistory} from "react-router-dom";

const ResetPasswordForm = () => {
    const history = useHistory();
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };

    const [state] = React.useState({
        username: "",
        password: "",
    });

    type StatusResponse = {
        data: {
            Code: number,
            Message: string,
            Data: {}
        }
    }

    type DataResponse = {
        Code: number,
        Message: string,
        Data: {}
    }

    const resetPassword = async (values: any) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `resetpassword/${values.username}`,
        }).then((response: StatusResponse) => {
            console.log(JSON.stringify(response.data.Message));
            return (response.data)
        }).catch(err => {
            console.log(err + " submission failed");
        });
    };

    const [successMessage, setSuccessMessage] = useState({successMessage: ""})

    const changeSuccessMessage = (response: DataResponse) => {
        if (response.Code === 1) {
            setSuccessMessage({successMessage: "Reset email successfully sent!"})
        }
        else {
            setSuccessMessage({successMessage: "Oops! Something went wrong :("})
        }
    }

    return (
        <div>
            <Formik
                validationSchema={resetPasswordSchema}
                onSubmit={ async (values, actions) => {
                    resetPassword(values).then( (result: any) => {
                        console.log(result);
                        changeSuccessMessage(result);

                    } )
                    // if(values["username"] === "admin") {
                    //     actions.setErrors({
                    //         username: "Please login through the admin page"
                    //     })
                    // }
                    // else {
                    //     // console.log(values)
                    //     // login(values).then(result => {
                    //     //     const token = result;
                    //     //     if (result === -1) {
                    //     //         actions.setErrors({
                    //     //             username: "Username is incorrect or does not exist",
                    //     //             password: "Password is incorrect"
                    //     //         });
                    //     //     }
                    //     //     else if (typeof token === "string") {
                    //     //         props.setToken(token);
                    //     //         const decoded = jwt_decode(token) as any;
                    //     //         props.setUsername(decoded.sub);
                    //     //         props.setExpiry(decoded.exp);
                    //     //         props.onSetLogin(true);
                    //     //         getUserInfo(values.username, token);
                    //     //     }
                    //     });
                    }
                }
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={state}>
                {({
                      handleSubmit,
                      handleChange,
                      values,
                      errors,
                  }) => {
                    const labels = [userLabel];
                    const formLabels = labels.map((label: FormInfo, index: number) => {
                        return (<Label key={index} errors={errors} handleChange={handleChange} name={label.name}
                                       values={values} placeholder={label.placeholder} type={label.type}/>)
                    });
                    return (
                        <FormContainer title={"Reset Password"}>
                            <Form noValidate onSubmit={handleSubmit}>
                                {formLabels}
                                <div className={styles.banner}>
                                    {successMessage.successMessage}
                                </div>
                                <FormButton name={"Reset Password"}/>
                            </Form>
                        </FormContainer>
                    );
                }}
            </Formik>
        </div>
    )
}

export default ResetPasswordForm