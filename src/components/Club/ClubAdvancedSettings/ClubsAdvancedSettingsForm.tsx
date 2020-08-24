import React, { useState, useEffect } from 'react'
import {Container, Row, Form, Table} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./ClubsAdvancedSettings.module.css";
import ClubManagerListing from "./ClubManagerListing";
import { Formik } from 'formik';
import * as yup from "yup";
import axios from "../../../axios";
import { StatusResponse } from '../../../types/DataResponses';

type advancedSettingsDefinition = {
    userToken: string
    clubID: number
    clubName: string
    userUsername: string
}

type User = {
    id: number
    username: string
}

const ClubsAdvancedSettingsForm = (input: advancedSettingsDefinition) => {

    const schema = yup.object({
        username: yup.string()
        .min(2, 'Username must be at least 2 characters')
        .max(15, 'Usernames cannot be more than 15 characters')
        .required('A username is required'),
        //image: yup.string().required(),
    });

    const [invited, setInvited] = useState("");

    const [managers, setManagers] = useState([{ id: -1, username: "" }]);

    const [foundClub, setFoundClub] = useState(false)
   
    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: 'get', //you can set what request you want to be
                url: `clubs/${input.clubID}/manages`,
                headers: {
                Authorization: `Bearer ${input.userToken}`
                }
            })
            .then ((result: any) => {
                setManagers(result.data.data);
                setFoundClub(true);
            })
            .catch( err => {
                setFoundClub(false);
            })
        };
        fetchData();
    }, [input.clubID, input.userToken]);

    const addManager = async (values: any) => {
        const username = values.username
        const lowerUsername = username.toString().toLowerCase()
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/clubs/${input.clubID}/manages/${lowerUsername}`,
            headers: {
                Authorization: `Bearer ${input.userToken}`
            },
            })
        .then((response: StatusResponse) => {
            if (response.data.code === 1) {
                setInvited("Successfully added manager!");
            }
            else {
                setInvited("Oops, something went wrong! Please try again later")
            }
            return response.data
        })
        .catch(err => {
            setInvited("Oops, something went wrong! Please check the username.")
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
                                addManager(values).then((result: any) => {
                                    const fetchData = async () => {
                                        const result = await axios({
                                            method: 'get', //you can set what request you want to be
                                            url: `clubs/${input.clubID}/manages`,
                                            headers: {
                                            Authorization: `Bearer ${input.userToken}`
                                            }
                                        })
                                        setManagers(result.data.data);
                                        };
                            
                                    fetchData();
                                })
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
                            <tr>
                                <td colSpan={3} className={"col-11"}>
                                    <b>Username</b>
                                </td>
                                <td className={"col-1"}><b>Manage</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            {managers.map((item: User) => <ClubManagerListing key={item.username} active={false} title={item.username}></ClubManagerListing>)}
                        </tbody>
                        </Table>
                    </Col>
                </Row>
        
        </Container>

    )
    
};

export default ClubsAdvancedSettingsForm;
