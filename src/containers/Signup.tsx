import React from 'react'
import Label from "../components/Form/Label";
import {Form, Button} from "react-bootstrap"
import FormContainer from "../components/Form/FormContainer";
import {userLabel, emailLabel, passLabel, passConfirmLabel, FormInfo} from "../types/FormInfo";
import {useHistory} from 'react-router-dom';
import '../app.css';
import {setLogin} from "../store/actions/actions";
import {connect} from "react-redux";
import {Formik} from "formik";
import FormButton from "../components/Form/FormButton";
import {signUpSchema} from "../components/Form/Schemas";
import axios from "../axios";

const SignUp = () => {
    const history = useHistory();
    const redirect = (path: string) => {
        history.replace({pathname: path})
    };

    const [state] = React.useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    // const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     const value = event.target.value
    //     const id = event.target.id
    //     setState({
    //         ...state,
    //         [id]: value
    //     })
    // }

    const signup = (values: any) => {
        axios.post("/signup", JSON.stringify({
            "IsStudent": true,
            "Username": values["username"],
            "Password": values["password"],
            "Email": values["email"],
        })).then(response => {
            console.log(response);
            redirect("/login");
        }).catch(err => {
            console.log(err + "Unable to get student ;.;");
        })
    };
    const isValidInfo = async (endpoint: "usernames" | "emails", value: string) => {
        const response = await axios.get(`/signup/${endpoint}/${value}`);
        return response.data === "" ? true : false
    };

    return (
        <div>
            <Button variant="outline-light" className="m-2 text-uppercase" onClick={() => redirect('/')}>Back to
                Home
            </Button>
            <Formik
                validationSchema={signUpSchema}
                // setSubmitting is already set to false when onSubmit is async
                onSubmit={async (values, actions) => {
                    const username = await isValidInfo("usernames", values.username)
                    const email = await isValidInfo("emails", values.email)
                    username && email ? await signup(values) : actions.setErrors({
                        username: username ? "" : "Username is already taken",
                        email: email ? "" : "Email is already taken"
                    });
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
                    const labels = [userLabel, emailLabel, passLabel, passConfirmLabel];
                    const formLabels = labels.map((label: FormInfo, index: number) => {
                        return (<Label key={index} errors={errors} handleChange={handleChange} name={label.name}
                                       values={values} placeholder={label.placeholder} type={label.type}/>)
                    });
                    return (
                        <FormContainer title={"Sign Up"}>
                            <Form noValidate onSubmit={handleSubmit}>
                                {formLabels}
                                <FormButton name={"Sign Up"}/>
                            </Form>
                        </FormContainer>
                    );
                }}
            </Formik>
        </div>
    )
};


export default connect(null, {setLogin})(SignUp)
