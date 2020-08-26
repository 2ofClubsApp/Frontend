import React, { useState } from 'react'
import {Button, Form, Modal} from "react-bootstrap";
import '../app.css';
import {Formik} from "formik";
import {loginSchema} from "../components/Form/Schemas";
import FormContainer from "../components/Form/FormContainer";
import Label from "../components/Form/Label";
import FormButton from "../components/Form/FormButton";
import ResetPasswordLink from "../components/ResetPassword/ResetPasswordLink"
import {FormInfo, passLabel, userLabel} from "../types/FormInfo";
import {useHistory} from 'react-router-dom'
import {connect, MapDispatchToProps} from "react-redux";
import {setLogin, setToken, setUsername, setExpiry} from "../store/actions/actions";
import axios from "../axios";
import jwt_decode from 'jwt-decode';

const Login = (props: any) => {
    const history = useHistory();
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };
    const [state] = React.useState({
        username: "",
        password: "",
    });

    const getUserInfo = async (username: string, token: any) => {
        return axios({
            method: 'get', //you can set what request you want to be
            url: `/users/${username}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
          }).then(response => {
            changeRoute("/usersettings");
        }).catch(err => {
            console.log(err + " unable to retrieve student info");
        });
    }

    const login = async (values: any) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/login`,
            data: {
                "username": values["username"],
                "password": values["password"]
            }
        })
          .then((response: any) => {
            const token = response.data.data.token;
            return token;
        })
        .catch(err => {
            if (err.response.data.message === "sorry, your account has not been approved yet") {
                return -2;
            }
            else if (err.response.data.message === "username or password is incorrect"){
                return -1;
            }
            return -1;
        });
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <div>
            <Modal show={show} onHide={handleClose} dialogClassName={"w-25"} centered={true}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className="text-center">This account has not been approved yet! Check back later!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Okay
                </Button>
                </Modal.Footer>
            </Modal>
            <Button variant="outline-light" className="m-2 text-uppercase" onClick={() => changeRoute('/')}>Back to
                Home
            </Button>
            <Button variant="outline-light" className="float-right m-2 text-uppercase" onClick={() => changeRoute('/adminlogin')}>Login as Admin
            </Button>
            <Formik
                validationSchema={loginSchema}
                onSubmit={ async (values, actions) => {
                    if(values["username"] === "admin") {
                        actions.setErrors({
                            username: "Please login through the admin page"
                        })
                    }
                    else {
                        login(values).then(result => {
                            const token = result;
                            if (result === -1) {
                                actions.setErrors({
                                    username: "Username is incorrect or does not exist",
                                    password: "Password is incorrect"
                                });
                            }
                            else if (result === -2) {
                                handleShow();
                            }
                            else if (typeof token === "string") {
                                var s = new Date();
                                s.setMinutes(s.getMinutes()+5);
                                var time = s.toUTCString();
                                document.cookie = "isLogged=true; path=/; samesite=strict; expires=" + time;
                                props.setToken(token);
                                const decoded = jwt_decode(token) as any;
                                props.setUsername(decoded.sub);
                                props.setExpiry(decoded.exp*1000);
                                props.onSetLogin(true);
                                getUserInfo(values.username, token);
                            }
                        });
                    }
                }}
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={state}>
                {({
                      handleSubmit,
                      handleChange,
                      values,
                      errors,
                  }) => {
                    const labels = [userLabel, passLabel];
                    const formLabels = labels.map((label: FormInfo, index: number) => {
                        return (<Label key={index} errors={errors} handleChange={handleChange} name={label.name}
                                       values={values} placeholder={label.placeholder} type={label.type}/>)
                    });
                    return (
                        <FormContainer title={"Login"}>
                            <Form noValidate onSubmit={handleSubmit}>
                                {formLabels}
                                <FormButton name={"Login"}/>
                            </Form>

                            <hr />

                            <ResetPasswordLink />

                        </FormContainer>
                    );
                }}
            </Formik>
        </div>
    )
};

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, null>) => {
    return {
        onSetLogin: () => dispatch(setLogin(true)),
        setToken: (token: string) => dispatch(setToken(token)),
        setUsername: (username: string) => dispatch(setUsername(username)),
        setExpiry: (date: number) => dispatch(setExpiry(date))
    }
}

export default connect(null, mapDispatchToProps)(Login)
