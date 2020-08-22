import React, {useState, useEffect} from 'react'
import {Container, Row, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "../ClubForm/ClubForm.module.css"
import { RootState } from '../../store';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from "yup";
import axios from "../../axios";
import ResetPasswordLink from '../ResetPassword/ResetPasswordLink';
import TagListing from '../TagsContainer/TagListing';
import {tag} from "../../types/DataResponses"

type UserSettingsDefinition = {
    title: string
    username: string
    email: string
    children: React.ReactNode
    newToken: string
}

const UserSettingsForm = (input: UserSettingsDefinition) => {

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

   

    const schema = yup.object({
        username: yup.string()
        .required('A username is required'),
        email: yup.string()
        .email('Invalid email')
        .required('A club email is required'),
        password: yup.string(),
        //image: yup.string().required(),
        newPassword: yup.string(),
        confirmNewPassword: yup.string()
        // .when("newPassword", {
        //     is: (val: string) => val && val.length > 0,
        //     then: yup.string()
        //       .oneOf([yup.ref("newPassword")], "Both passwords need to be the same")
        //       .required()
        //   }),
    });

    const changePassword = async (values: any) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/changePassword/users/${input.username}`,
            headers: {
                Authorization: `Bearer ${input.newToken}`
            },
            data: {
                "oldPassword": values.password,
                "newPassword": values.newPassword
            }
            }).then((response: StatusResponse) => {
                console.log(JSON.stringify(response.data.Message));
                return (response.data)
        }).catch(err => {
            console.log(err + " submission failed");
        });
    };

    const updateUserTags = async (values: any) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/users/${input.username}/tags`,
            headers: {
                Authorization: `Bearer ${input.newToken}`
            },
            data: {
                "Tags": userData
            }
            }).then((response: StatusResponse) => {
                return (response.data)
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
    
    const [data, setData] = useState([{id: -1, name: "N/A", isActive: true}]);
    const [userData, setUserData] = useState(["None"]);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/tags/active`})
            .then ( (result: any) => {
                setData(result.data.data);
                }
            )
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/users/${input.username}`,
                headers: {
                    Authorization: `Bearer ${input.newToken}`
                },
            })
            const tagsArray = result.data.data.tags;
            if (tagsArray !== []){
                const tagNamesArray = tagsArray.map((item: tag) => item.name);
                setUserData(tagNamesArray);
            }
            else{
                return ["None"]
            }
            
        };
        fetchData();
    }, [input.newToken, input.username]);

    

    const renderTags = () => {
        return data.map((item: any) => (<TagListing admin={false} key={item.name} id={item.id} label={item.name} checked={userData.includes(item.name)} myVar={userData} setMyVar={setUserData} myVar2={["N/A"]} setMyVar2={null}/>))
    }

    const savedMessage = () => {
        if (saved) {
            return "Saved!";
        }
        else {
            return "";
        }
    }

    return (
        <Container className={styles.container}>
                <Row>
                    <Col>
                    <h1 className={styles.title}>Tell us more about you!</h1>
                    </Col>
                </Row>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                        updateUserTags(values);
                        setSaved(true);
                        console.log("new password is " + values.password)
                        if (values.password) {
                            const check = checkPasswords(values.newPassword, values.confirmNewPassword);
                            if (check === 1) {
                                changePassword(values)
                                .then( (result: any) => {
                                    console.log(result.message)
                                    if (result.code === -1) {
                                        actions.setErrors({password: `Password is incorrect`});
                                    }
                                    else{
                                        actions.setErrors({password: ""});
                                        values.password = "";
                                        values.newPassword = "";
                                    }
                                    
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
                    }
                    initialValues={{
                        username: `${input.username}`,
                        email: `${input.email}`,
                        password: "",
                        newPassword: "",
                        confirmNewPassword: "",
                    }}
                    enableReinitialize={true}
                    >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} md={6}>
                                    <Form.Label className={styles.subtitle}>Username</Form.Label>
                                    <Form.Control
                                        className={styles.inputBox}
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        value={input.username || ""}
                                        onChange={handleChange}
                                        isInvalid={!!errors.username}
                                        disabled
                                        id="userValidationFormikUsername"
                                    />

                                    <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                        {errors.username}
                                    </Form.Control.Feedback>

                                    <Form.Label className={styles.subtitle + " mt-4"}>Email</Form.Label>
                                    <Form.Control
                                        className={styles.inputBox}
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={input.email || ""}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                        disabled
                                        id="userValidationFormikEmail"
                                    />

                                    <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md={6} className={"pl-5"}>
                                    <Form.Label className={styles.subtitle}>Tags</Form.Label>
                                    <div className={styles.tagsContainer}>
                                        {renderTags()}
                                    </div>
                                </Form.Group>
                            </Form.Row>
                        
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="bio">
                                    <Form.Row className={"d-flex align-items-center justify-content-between " + styles.pl5px}>
                                        <Form.Label className={styles.subtitle}>Current Password</Form.Label>
                                        <div><ResetPasswordLink /></div>

                                    </Form.Row>
                                <Form.Control
                                    className={styles.inputBox}
                                    required
                                    type="password"
                                    placeholder=""
                                    name="password"
                                    defaultValue={""}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid" className={styles.inputBox}>{errors.password}</Form.Control.Feedback>

                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="userValidationFormik02">
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
                                <Form.Group as={Col} md="6" controlId="userValidationFormik03">
                                <Form.Label className={styles.subtitle}>Re-type New Password</Form.Label>
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
                        
                        <Form.Row className="d-flex justify-content-end align-items-center">
                            <div className={"mr-4 mb-0 mt-0 " + styles.subtitle}>{savedMessage()} </div>
                            <Button type="submit" className={"float-right " + styles.btnpurple}>
                                Save settings
                            </Button>
                        </Form.Row>
                        
                        </Form>
                    )}
                    </Formik>
            </Container>
    )
};

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token
    }
}

export default connect(mapStateToProps)(UserSettingsForm);
