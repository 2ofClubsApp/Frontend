import {Form, Modal, Button, Col} from "react-bootstrap";
import React from "react";
import "../ClubsOverviewTable/ClubsOverview.css";
import {Link} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faCoffee } from '@fortawesome/free-solid-svg-icons'
import "../NavBar/NavBar"
import { RootState } from "../../store";
import { connect } from "react-redux";
import styles from "../ClubForm/ClubForm.module.css"
import { Formik } from "formik";
import * as yup from "yup";
import axios from "../../axios";

library.add(faCog, faCoffee)

type clubDefinition = {
    show: any,
    onHide: any,
    newToken: string
    clubID: number
    myVar: event[]
    setMyVar: any
}

type event = {
    "name": string,
    "description": string,
    "location": string,
    "fee": number
}


const EventForm = (input: clubDefinition) => {

    const schema = yup.object({
        eventName: yup.string()
        .required('A name for the event is required'),
        location: yup.string()
        .required('A location is required'),
        bio: yup.string()
        .max(150, 'Bios can be a maximum of 150 characters'),
        //image: yup.string().required(),
        fee: yup.number()
    });

    console.log("in event form token is "+input.newToken)

    const createEvent = async (values: any) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/clubs/${input.clubID}/events`,
            headers: {
                Authorization: `Bearer ${input.newToken}`
            },
            data: {
                "name": values["eventName"],
                "description": values["bio"],
                "location": values["location"],
                "fee": parseFloat(values["fee"])
            }
            }).then((response: any) => {
                console.log(response.data)
                return (response.data)
        }).catch(err => {
            console.log(err + " submission failed");
        });
    };

    return (
        <Modal show={input.show} onHide={input.onHide} className={styles.EventForm}>
            <Modal.Header closeButton>
            <Modal.Title className={styles.title + " mb-0 ml-5"}>Create an Event!</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.EventFormContent}>

            <Formik
                    validationSchema={schema}
                    onSubmit={(values) => {
                        console.log("submitting")
                        createEvent(values).then(() => {
                            const fetchData = async () => {
                                const result = await axios({
                                    method: 'get', //you can set what request you want to be
                                    url: `/clubs/${input.clubID}/events`,
                                }).then((result: any) => {
                                    input.setMyVar(result.data.data.Hosts);
                                    console.log(result.data.data.Hosts);
                                }
                                )
                            };
                    
                            fetchData();
                        })
                        
                        input.onHide();
                        // update(values)
                        // .then((result: any) => {
                        //     console.log(result)               
                        // });
                        // updateClubTags(values);
                        // setSaved(true);
                    }   
                    }
                    initialValues={{
                        eventName: ``,
                        location: `asdf`,
                        bio: `asdf`,
                        fee: `0`,
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
                            <Form.Label className={styles.subtitle}>Event Name</Form.Label>
                            <Form.Control
                                className={styles.inputBox}
                                type="text"
                                placeholder="Event Name"
                                name="eventName"
                                onChange={handleChange}
                                isInvalid={!!errors.eventName}
                                id="eventname"                                   
                            />

                            <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                {errors.eventName}
                            </Form.Control.Feedback>
                        </Form.Row>
                        <Form.Row>

                                <Form.Label className={styles.subtitle + " mt-3"}>Bio</Form.Label>
                                <Form.Control
                                    className={styles.inputBox}
                                    required
                                    as="textarea"
                                    rows={3}
                                    name="bio"
                                    defaultValue={''}
                                    onChange={handleChange}
                                    isInvalid={!!errors.bio}
                                />
                                <Form.Control.Feedback type="invalid" className={styles.inputBox}>{errors.bio}</Form.Control.Feedback>

                        </Form.Row>
                        <Form.Row>
                            <Form.Label className={styles.subtitle + " mt-3"}>Location</Form.Label>
                                <Form.Control
                                    className={styles.inputBox}
                                    type="text"
                                    placeholder="Location"
                                    name="location"
                                    onChange={handleChange}
                                    isInvalid={!!errors.location}
                                    id="location"
                                />

                                <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                    {errors.location}
                                </Form.Control.Feedback>
                        </Form.Row>
                        

                        <Form.Row>

                                <Form.Label className={styles.subtitle + " mt-3"}>Fee</Form.Label>
                                <Form.Control
                                    className={styles.inputBox}
                                    type="text"
                                    placeholder="Fee"
                                    name="fee"
                                    onChange={handleChange}
                                    isInvalid={!!errors.fee}
                                />

                                <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                    {errors.fee}
                                </Form.Control.Feedback>

                        </Form.Row>

                        <Form.Row className="d-flex justify-content-end align-items-center mt-3">
                            <Button type="submit" className={styles.btnpurple}>
                                Save event
                            </Button>
                        </Form.Row>
                        
                        </Form>
                    )}
                    </Formik>




            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            
      </Modal>        
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

export default connect(mapStateToProps)(EventForm);