import React from 'react'
import Button from "react-bootstrap/Button";
import Label from "../components/Form/Label";
import {FormInfo, passLabel, userLabel} from "../types/FormInfo";
import {useHistory} from 'react-router-dom'
import '../app.css';
import {Formik} from "formik";
import {loginSchema} from "../components/Form/Schemas";
import FormContainer from "../components/Form/FormContainer";
import {Form} from "react-bootstrap";
import FormButton from "../components/Form/FormButton";
import {connect, MapDispatchToProps} from "react-redux";
import {setLogin, setToken, setUsername, setExpiry} from "../store/actions/actions";
import axios from "../axios";
import jwt_decode from 'jwt-decode';
import ResetPasswordLink from "../components/ResetPassword/ResetPasswordLink"
import {StatusResponse} from "../types/DataResponses"

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
            //console.log(response.data);
            changeRoute("/usersettings");
        }).catch(err => {
            console.log(err + " unable to retrieve student info");
        });
    }

    const login = async (values: any) => {
        return axios.post("/login", JSON.stringify({
            "Username": values["username"],
            "Password": values["password"],
        })).then((response: StatusResponse) => {
            console.log(JSON.stringify(response.data.message));
            if (response.data.code === -1){
                return -1;
            }
            else{
                const token = response.data.data.Token;
                return token;
            }
        }).catch(err => {
            console.log(err + " failed to login");
        });
    };
  
    
    return (
        <div>
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
                    // console.log(values)
                        login(values).then(result => {
                            const token = result;
                            if (result === -1) {
                                actions.setErrors({
                                    username: "Username is incorrect or does not exist",
                                    password: "Password is incorrect"
                                });
                            }
                            else if (typeof token === "string") {
                                props.setToken(token);
                                const decoded = jwt_decode(token) as any;
                                props.setUsername(decoded.sub);
                                props.setExpiry(decoded.exp);
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
