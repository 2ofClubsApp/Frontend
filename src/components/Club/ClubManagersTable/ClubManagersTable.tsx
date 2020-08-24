import React, { useState, useEffect } from 'react'
import {Container, Row, Form, Table, Modal} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./ClubManagersTable.module.css";
import ClubManagerListing from "./ClubManagerListing";
import { Formik } from 'formik';
import * as yup from "yup";
import axios from "../../../axios";
import { StatusResponse, User } from '../../../types/DataResponses';
import { useHistory } from 'react-router-dom';

type advancedSettingsDefinition = {
    userToken: string
    clubID: number
    clubName: string
    userUsername: string
}

const ClubsAdvancedSettingsForm = (input: advancedSettingsDefinition) => {
    const history = useHistory();

    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };

    const schema = yup.object({
        username: yup.string()
        .min(2, 'Username must be at least 2 characters')
        .max(15, 'Usernames cannot be more than 15 characters')
        .required('A username is required'),
        //image: yup.string().required(),
    });

    const [invited, setInvited] = useState("");

    const [managers, setManagers] = useState([{ id: -1, username: "" }]);

    const [isOwner, setIsOwner] = useState(false);

    const checkOwner = (arr: any[]) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].username === input.userUsername) {
                setIsOwner(false);
                return;
            }
        }
        setIsOwner(true);
        return;
    }
   
    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: 'get',
                url: `clubs/${input.clubID}/manages`,
                headers: {
                Authorization: `Bearer ${input.userToken}`
                }
            })
            .then ((result: any) => {
                setManagers(result.data.data);
                checkOwner(result.data.data);
            })
            .catch( err => {

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

    const deleteManager = async (username: string) => {
        const lowerUsername = username.toString().toLowerCase();
        return axios({
            method: 'delete', //you can set what request you want to be
            url: `/clubs/${input.clubID}/manages/${lowerUsername}`,
            headers: {
                Authorization: `Bearer ${input.userToken}`
            },
            })
        .then((response: StatusResponse) => {
            return response.data
        })
        .catch(err => {
            
        });
    };

    const promoteManager = async (username: string) => {
        const lowerUsername = username.toString().toLowerCase();
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/clubs/${input.clubID}/promote/${lowerUsername}`,
            headers: {
                Authorization: `Bearer ${input.userToken}`
            },
            })
        .then((response: StatusResponse) => {
            return response.data
        })
        .catch(err => {
            
        });
    };

    const leaveClub = async () => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/clubs/${input.clubID}/leave`,
            headers: {
                Authorization: `Bearer ${input.userToken}`
            },
            })
        .then((response: StatusResponse) => {
            return response.data
        })
        .catch(err => {
            
        });
    };

    const [showDelete, setShowDelete] = useState(false);
    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    const [managerUsername, setManagerUsername] = useState("");

    const deleteConfirmed = () => {
        deleteManager(managerUsername)
        .then( () => {
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
                })
                .catch( err => {
                
                })
            };
            fetchData();
        });
    }

    const [showPromote, setShowPromote] = useState(false);
    const handlePromoteClose = () => setShowPromote(false);
    const handlePromoteShow = () => setShowPromote(true);

    const promoteConfirmed = () => {
        promoteManager(managerUsername)
        .then( () => {
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
                })
                .catch( err => {
                
                })
            };
            fetchData();
        });
    }

    const [showLeave, setShowLeave] = useState(false);
    const handleLeaveClose = () => setShowLeave(false);
    const handleLeaveShow = () => setShowLeave(true);

    const leaveConfirmed = () => {
        leaveClub()
        .then( () => {
            changeRoute("/");
        });
    }

    return (
        <>
        <Modal show={showDelete} onHide={handleDeleteClose} dialogClassName="w-25" centered={true}>
            <Modal.Header closeButton />
            <Modal.Body className="text-center">Are you sure you want to <b className={styles.red}>remove</b> this manager?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {deleteConfirmed(); handleDeleteClose()}}>
                    Remove Manager
                </Button>
                <Button variant="light" onClick={handleDeleteClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showPromote} onHide={handlePromoteClose} dialogClassName={"p-3 " + styles.w30} centered={true}>
            <Modal.Header closeButton />
            <Modal.Body className="text-center"><p>Are you sure you want to <b>promote this manager</b> to <b>owner</b>?</p>(This action is irreversible and will demote you to a manager!)</Modal.Body>
            <Modal.Footer>
                <Button className={styles.btnpurple} onClick={() => {promoteConfirmed(); handlePromoteClose()}}>
                    Promote to Owner
                </Button>
                <Button variant="light" onClick={handlePromoteClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showLeave} onHide={handleLeaveClose} dialogClassName="w-25" centered={true}>
            <Modal.Header closeButton />
            <Modal.Body className="text-center">Are you sure you want to <b className={styles.red}>leave</b> {input.clubName}?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {leaveConfirmed(); handleLeaveClose()}}>
                    Leave
                </Button>
                <Button variant="light" onClick={handleLeaveClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>

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

                        <span className={styles.subtitle}>Existing Managers</span>
                        <div className={"p-4"}>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <td colSpan={3} className={"col-8"}>
                                            <b>Username</b>
                                        </td>
                                        <td colSpan={2} className={"col-4 text-center"}>
                                            <b>Manage</b>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {managers.map((item: User) => <ClubManagerListing key={item.username} clubID={input.clubID} username={item.username} userToken={input.userToken} confirmDeletionPopup={handleDeleteShow} confirmPromotePopup={handlePromoteShow} setManagerUsername={setManagerUsername} isOwner={isOwner}/>)}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-end mt-2 mr-4">
                    <Button variant="outline-danger" onClick={handleLeaveShow}>Leave Club</Button>
                </Row>
                
        </Container>
        </>
    )
    
};

export default ClubsAdvancedSettingsForm;
