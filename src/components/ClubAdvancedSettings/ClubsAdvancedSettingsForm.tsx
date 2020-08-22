import React, { useState } from 'react'
import {Container, Row, Form, Table} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./ClubsAdvancedSettings.module.css";
import ClubAdminsListing from "./ClubAdminsListing";
import { Formik } from 'formik';
import * as yup from "yup";
import axios from "../../axios";

type advancedSettingsDefinition = {
    newToken: string
    clubID: number
    clubName: string
}

const ClubsAdvancedSettingsForm = (input: advancedSettingsDefinition) => {

    type StatusResponse = {
        data: {
            code: number,
            message: string,
            data: {}
        }
    }

    type dataResponse = {
        Code: number,
        Message: string,
        Data: {}
    }

    console.log(input.newToken);

    const schema = yup.object({
        username: yup.string()
        .min(2, 'Username must be at least 2 characters')
        .max(15, 'Usernames cannot be more than 15 characters')
        .required('A username is required'),
        //image: yup.string().required(),
    });

    const [invited, setInvited] = useState("");
    const addManager = async (values: any) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/clubs/${input.clubID}/manages/${values.username}`,
            headers: {
                Authorization: `Bearer ${input.newToken}`
            },
            }).then((response: StatusResponse) => {
                console.log(JSON.stringify(response.data.message));
                setInvited(response.data.message);
                return response.data
        }).catch(err => {
            console.log(err + " failed to add user");
        });
    };



    return (

        <Container className={styles.container}>
            
                <Row>
                    <Col>
                        <Formik
                            validationSchema={schema}
                            onSubmit={async (values, actions) => {
                                console.log(values.username);
                                addManager(values)
                            }}
                            initialValues={{
                                username: ''
                            }}
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
                                    <Form.Label className={styles.subtitle}>Invite Users as Managers for {input.clubName}</Form.Label>
                                    <Form.Row className="d-flex justify-content-center">
                                        <Col sm={12} md={12} lg={5} className="d-flex justify-content-center align-items-center m-2">
                                            <Form.Control 
                                                className={"mr-3 w-75"}
                                                type="text"
                                                placeholder="Username"
                                                name="username"
                                                onChange={handleChange}
                                                isInvalid={!!errors.username}/>
                                            <Button variant="primary" type="submit">Invite</Button>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className={"d-flex justify-content-center"}>
                                        <span className={styles.subtitle + " m-0 mb-2"}>{invited}</span>
                                    </Form.Row>
                                    
                                </Form>
                            )}
                        </Formik>

                        <span className={styles.subtitle}>Existing Users</span>
                        <Table responsive >
                        <thead>
                            <tr className={"d-flex"}>
                                <td colSpan={3} className={"col-11"}>
                                    <b>Username</b>
                                </td>
                                <td className={"col-1"}><b>Manage</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            <ClubAdminsListing active={false} title={"JohnSmith"}></ClubAdminsListing>
                        </tbody>
                        </Table>
                    </Col>
                </Row>
           
        </Container>

        )
};

export default ClubsAdvancedSettingsForm;
