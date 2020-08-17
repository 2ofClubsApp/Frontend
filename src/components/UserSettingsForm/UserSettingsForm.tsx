import React, {useState, useEffect} from 'react'
import {ToggleButton, Container, Row, Image, Form, Modal} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "../ClubForm/ClubForm.module.css"
import TagsContainer from "../TagsContainer/TagListing"
import { RootState } from '../../store';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from "yup";
import axios from "../../axios";
import { Link } from 'react-router-dom';
import ResetPasswordLink from '../ResetPassword/ResetPasswordLink';
import TagListing from '../TagsContainer/TagListing';

type UserSettingsDefinition = {
    title: string
    username: string
    email: string
    children: React.ReactNode
    newToken: string
}

const decode = (state: RootState) => {
    console.log(state.system.token);
    const token = state.system.token;
    return token;
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
        password: yup.string()
        .required(),
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

    // const changePassword = async (values: any) => {
    //     return axios({
    //         method: 'post', //you can set what request you want to be
    //         url: `/resetpassword/${input.username}/${input.newToken}`,
    //         headers: {
    //             Authorization: `Bearer ${input.newToken}`
    //         },
    //         data: {
    //             "Password": values.newPassword
    //         }
    //         }).then((response: StatusResponse) => {
    //             console.log(JSON.stringify(response.data.Message));
    //             return (response.data)
    //     }).catch(err => {
    //         console.log(err + " submission failed");
    //     });
    // };

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
                console.log(JSON.stringify(response.data.Message));
                return (response.data)
        }).catch(err => {
            console.log(err + " submission failed");
        });
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (result: DataResponse) => {
        if (result.Code === 1){
            setPopupMsg({header: "Yay!", body: "Password was successfully changed!"})
        }
        else {
            setPopupMsg({header: "Whoops!", body:`An error occurred please try again later or contact an administrator (Error code ${result.Code}: ${result.Message})`})
        }
        setShow(true);
    };

    const [popupMsg, setPopupMsg] = useState({header: "", body: ""})

    const checkPasswords = (password1: string, password2: string) => {
        if (password1 === password2) {
            return 1;
        }
        return -1;
    }
    
    const [data, setData] = useState({ Tags: ["No tags yet!"] });
    const [userData, setUserData] = useState(["None"]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/tags`})
            if (result.data.Data.Tags === null) {
                const tags = {Tags: ["No tags yet!"]}
                setData(tags);
            }
            else {
                setData(result.data.Data);
            }
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
            setUserData(result.data.Data.Tags);
        };
        fetchData();
    }, []);

    

    const renderTags = () => {
        
        return data.Tags.map((item: string) => (<TagListing key={item} id={item} label={item} checked={userData.includes(item)} myVar={userData} setMyVar={setUserData}/>))
        
    }

    return (
        <Container className={styles.container}>
                <Modal show={show} onHide={handleClose} dialogClassName={styles.ErrorModal}>
                    <Modal.Header className="d-flex justify-content-center">
                    <Modal.Title className="text-center">{popupMsg.header}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">{popupMsg.body}</Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Row>
                    <Col>
                    <h1 className={styles.title}>Tell us more about you!</h1>
                    </Col>
                </Row>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                        console.log("submitting");
                        console.log(userData);
                        updateUserTags(values);
                        //const check = checkPasswords(values.newPassword, values.confirmNewPassword);
                        // if (check === 1) {
                        //     changePassword(values)
                        //     .then( (result: any) => {
                        //         console.log(result);
                        //         handleShow(result);
                        //     } )
                        // }
                        // else {
                        //     actions.setErrors({
                        //         newPassword: "Passwords do not match",
                        //         confirmNewPassword: "Passwords do not match"
                        //     })
                        // }
                        // changePassword(values)
                        // .then((result: any) => {
                        //     console.log(result)
                        //     if (result.Code !== 1){
                        //         handleShow(result)
                        //     }
                        //     else {
                        //         handleShow(result)
                        //     }                        
                        // });
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
                        <Form.Group as={Col} md="6" controlId="validationFormik02">
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
                                
                            />

                            <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                            <Form.Group as={Col} md="6">
                            <Form.Label className={styles.subtitle}>Tags</Form.Label>
                            <div className={styles.tagsContainer}>
                                {renderTags()}
                            </div>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationFormik03">
                            <Form.Label className={styles.subtitle}>Email</Form.Label>
                            <Form.Control
                                className={styles.inputBox}
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={input.email || ""}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                                disabled
                            />

                            <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                {errors.email}
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="bio">
                                <Form.Row className={"d-flex align-items-center justify-content-between"}>
                                    <Form.Label className={styles.subtitle}>Password</Form.Label>
                                    <div className={"float-right"}><ResetPasswordLink /></div>

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
                            <Form.Group as={Col} md="6" controlId="validationFormik04">
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
                            <Form.Group as={Col} md="6" controlId="validationFormik05">
                            <Form.Label className={styles.subtitle}>Confirm New Password</Form.Label>
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
                        <Form.Row className="d-flex justify-content-end">
                            <Button type="submit" className={"float-right"} style={{color:"#fff", backgroundColor:"#696de9", border:"none", textTransform:"uppercase"}}>
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
    const token = state.system.token;
    console.log("token in usersettingsform is" + token);
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token
    }
}

export default connect(mapStateToProps)(UserSettingsForm);
