import {Form, Modal, Button, Col } from "react-bootstrap";
import React from "react";
import styles from "../../Club/ClubForm/ClubForm.module.css"
import { Formik } from "formik";
import * as yup from "yup";
import axios from "../../../axios";
import { eventPOST } from "../../../types/DataResponses";

type eventFormDefinition = {
    show: any,
    onHide: any,
    newToken: string
    clubID: number
    myVar: eventPOST[]
    setMyVar: any
}

const EventForm = (input: eventFormDefinition) => {

    const schema = yup.object({
        eventName: yup.string()
        .required('A name for the event is required'),
        location: yup.string()
        .required('A location is required'),
        date: yup.date(),
        //.required('A location is required'),
        bio: yup.string()
        .max(150, 'Bios can be a maximum of 150 characters'),
        //image: yup.string().required(),
        fee: yup.number()
        .min(0)
    });


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
                                await axios({
                                    method: 'get', //you can set what request you want to be
                                    url: `/clubs/${input.clubID}/events`,
                                }).then((result: any) => {
                                    input.setMyVar(result.data.data.hosts);
                                    console.log(result.data.data.hosts);
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
                        date: ``,
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
                            <Form.Group as={Col} md={6}>
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
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <Form.Label className={styles.subtitle + " mt-3"}>Date</Form.Label>
                                <Form.Control
                                    className={styles.inputBox}
                                    type="text"
                                    placeholder="Date"
                                    name="date"
                                    onChange={handleChange}
                                    isInvalid={!!errors.location}
                                    id="date"
                                />

                                <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                    {errors.date}
                                </Form.Control.Feedback>
                            </Form.Group>
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

export default EventForm;