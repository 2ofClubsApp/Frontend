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
import {RootState} from "../store";
import {setLogin} from "../store/actions/actions";
import axios from "../axios";

const Login = (props: any) => {
    const history = useHistory();
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };
    const [state] = React.useState({
        username: "",
        password: "",
    });

    // const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     const value = event.target.value
    //     const id = event.target.id
    //     setState({
    //         ...state,
    //         [id]: value
    //     })
    // }

    // const validatelogin = async (values: any) => {
    //     return axios.get(`/users/${}`, JSON.stringify({
    //         "Username": values["username"],
    //         "Password": values["password"],
    //     })).then(response => {
    //         console.log(response.data);
    //         const token = response.data
    //         return token;
    //     }).catch(err => {
    //         console.log(err + "Unable to get student ;.;");
    //     });
    // };

    const getUserInfo = async (username: string, token: any) => {
        return axios({
            method: 'get', //you can set what request you want to be
            url: `/users/${username}`,
            headers: {
              Token: token
            }
          }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err + " unable to retrieve student info");
        });
    }

    const createClub = async (values: any, token: string) => {
        // return axios.post("/clubs", JSON.stringify({
        //     "Email": "hacklab@hl.com",
        //     "Bio": "Hacklab is cool",
        //     "Size": 20,
        //     "Name": "Hacklab"
        // })).then(response => {
        //     console.log(response);
        // }).catch(err => {
        //     console.log(err + " failed to login");
        // });
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/clubs`,
            headers: {
              Token: token
            },
            data: {
                Email: "hacklab@hl.com",
                Bio: "Hacklab",
                Size: 20,
                Name: "Hacklab"
            }
          }).then(response => {
            console.log("trying to create club");
            console.log(response);
        }).catch(err => {
            console.log(err + " unable to retrieve student info");
        });
    };
    



    const login = async (values: any) => {
        return axios.post("/login", JSON.stringify({
            "Username": values["username"],
            "Password": values["password"],
        })).then(response => {
            console.log(response.data);
            console.log("token got")
            const token = response.data;
            return token;
        }).catch(err => {
            console.log(err + " failed to login");
        });
    };
  

    return (
        <div>
            <Button variant="outline-light" className="m-2 text-uppercase" onClick={() => changeRoute('/')}>Back to
                Home
            </Button>
            <Formik
                validationSchema={loginSchema}
                onSubmit={ async (values, actions) => {
                    // console.log(values)
                        login(values).then(result => {
                            const token = result;
                            console.log("token passed in is");
                            console.log(token);
                            //getUserInfo(values.username, token);
                            createClub(values, token);
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
                        </FormContainer>
                    );
                }}
            </Formik>
        </div>
    )
};

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, null>) => {
    return {
        onSetLogin: () => dispatch(setLogin(true))
    }
}
const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
