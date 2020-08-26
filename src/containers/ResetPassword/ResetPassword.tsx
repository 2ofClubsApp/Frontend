import React, { useState } from 'react'
import {Container, Button, Form, Col} from "react-bootstrap";
import {useHistory} from 'react-router-dom'
import NavBar from "../../components/NavBar/NavBar"
import ResetPasswordForm from '../../components/ResetPassword/ResetPasswordForm';
import {RootState} from "../../store/reducers";
import {connect, MapDispatchToProps} from "react-redux";
import {setLogin, setToken, setUsername, setExpiry} from "../../store/actions/actions";
import {useParams} from 'react-router-dom';
import * as yup from "yup";
import { Formik } from 'formik';
import { resetPasswordSchema } from '../../components/Form/Schemas';
import FormContainer from '../../components/Form/FormContainer';
import FormButton from '../../components/Form/FormButton';
import axios from "./../../axios"
import { DataResponse } from '../../types/DataResponses';
import styles from "./ResetPassword.module.css"

const ResetPassword = (props: any) => {
    const history = useHistory();
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };

    let { user, token } = useParams();

    const resetPassword = async (values: any) => {
        console.log(values["newPassword"]);
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/resetpassword/${user}/${token}`,
            data: {
                "Password": values["newPassword"]
            }
        }).then((response: any) => {
            return (response)
        }).catch(err => {
            console.log(err + " submission failed");
        });
    };

    const checkPasswords = (password1: string, password2: string) => {
        if (password1 === password2) {
            return 1;
        }
        return -1;
    }
    
    const resetschema = yup.object({
        newPassword: yup.string()
        .required("Required field"),
        confirmNewPassword: yup.string()
        .required("Required field")
    });
    
    return (
        <div>
            <Button variant="outline-light" className="m-2 text-uppercase" onClick={() => changeRoute('/')}>Back to
                    Home
                </Button>
            <Formik
                validationSchema={resetschema}
                onSubmit={ async (values, actions) => {
                            const check = checkPasswords(values.newPassword, values.confirmNewPassword);
                            if (check === 1) {
                                resetPassword(values)
                                .then( (result: any) => {
                                    changeRoute("/");
                                } )
                            }
                            else {
                                actions.setErrors({
                                    newPassword: "Passwords do not match",
                                    confirmNewPassword: "Passwords do not match"
                                })
                            }
                    }
                }
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{
                    newPassword: "",
                    confirmNewPassword: ""
                }}>
                {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      isValid,
                      errors,
                  }) => {
                    return (
                        <FormContainer title={"Reset Password"}>
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="12" controlId="userValidationFormik02">
                                    <Form.Label className={styles.subtitle}>New Password</Form.Label>
                                    <Form.Control
                                        className={styles.inputBox}
                                        type="password"
                                        placeholder=""
                                        name="newPassword"
                                        defaultValue={""}
                                        onChange={handleChange}
                                        isInvalid={!!errors.newPassword}
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                        {errors.newPassword}
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                    
                                <Form.Row>
                                    <Form.Group as={Col} md="12" controlId="userValidationFormik03">
                                    <Form.Label className={styles.subtitle}>Re-type Password</Form.Label>
                                    <Form.Control
                                        className={styles.inputBox}
                                        type="password"
                                        placeholder=""
                                        name="confirmNewPassword"
                                        defaultValue={""}
                                        onChange={handleChange}
                                        isInvalid={!!errors.confirmNewPassword}
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                        {errors.confirmNewPassword}
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <div className={"d-flex justify-content-center align-items-center"}>
                                <Button type="submit" className={styles.btnpurple}>Reset Password</Button>
                                </div>
                            </Form>
                        </FormContainer>
                    );
                }}
            </Formik>
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, null>) => {
    return {
        onSetLogin: (isLogged: boolean) => dispatch(setLogin(isLogged)),
        setToken: (token: string) => dispatch(setToken(token)),
        setUsername: (username: string) => dispatch(setUsername(username)),
        setExpiry: (date: number) => dispatch(setExpiry(date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
