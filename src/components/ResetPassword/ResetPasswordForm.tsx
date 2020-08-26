import React, {useState} from 'react'
import {Form, Col} from "react-bootstrap";
import styles from "./ResetPasswordForm.module.css"
import {Formik} from "formik";
import axios from "../../axios";
import {resetPasswordSchema} from "../Form/Schemas";
import {FormInfo, userLabel} from "../../types/FormInfo";
import Label from "../Form/Label";
import FormContainer from "../Form/FormContainer";
import FormButton from "../Form/FormButton";
import { StatusResponse, DataResponse } from "../../types/DataResponses"

//import {useHistory} from "react-router-dom";


const ResetPasswordForm = () => {
    // const history = useHistory();
    // const changeRoute = (path: string) => {
    //     history.replace({pathname: path})
    // };

    const [state] = React.useState({
        username: "",
        password: "",
    });

    const resetPassword = async (values: any) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `resetpassword/${values.username}`,
        }).then((response: any) => {
            console.log(response);
            return (response)
        }).catch(err => {
            console.log(err + " submission failed");
        });
    };

    const [successMessage, setSuccessMessage] = useState({successMessage: ""})

    const changeSuccessMessage = (response: DataResponse) => {
        // if (response.code === 1) {
        //     setSuccessMessage({successMessage: "Reset email successfully sent!"})
        // }
        // else {
        //     setSuccessMessage({successMessage: "Oops! Something went wrong :("})
        // }
    }

    return (
        <div>
            <Formik
                validationSchema={resetPasswordSchema}
                onSubmit={ async (values, actions) => {
                    resetPassword(values)
                    .then( (result: any) => {
                        console.log(result);
                        changeSuccessMessage(result);
                    });
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