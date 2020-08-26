import { Form, Modal, Button, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import styles from "../../Club/ClubForm/ClubForm.module.css"
import { Formik } from "formik";
import * as yup from "yup";
import axios from "../../../axios";
import { eventPOST, DataResponse, StatusResponse } from "../../../types/DataResponses";

type eventFormDefinition = {
    isNew: boolean
    show: any,
    onHide: any,
    newToken: string,
    clubID: number,
    events: eventPOST[],
    setEvents: any,
    eventID: number
}

const EventForm = (input: eventFormDefinition) => {

    const [event, setEvent] = useState({ "id": -1, "name": "", "description": "", "datetime": "", "location": "", "fee": 0 })

    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: 'get', //you can set what request you want to be
                url: `/events/${input.eventID}`,
            }).then((result: any) => {
                setEvent(result.data.data);
            }
            )
        };
        if (!input.isNew) {
            fetchData();
        }
    }, [input.eventID, input.isNew]);

    const schema = yup.object({
        eventName: yup.string()
            .required('A name for the event is required'),
        location: yup.string()
            .required('A location is required'),
        date: yup.date()
            .required('An event date is required'),
        description: yup.string()
            .max(150, 'descriptions can be a maximum of 150 characters'),
        fee: yup.number()
            .min(0)
    });

    const createEvent = async (values: any) => {
        let date = values["date"] + ":00-04:00";
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/clubs/${input.clubID}/events`,
            headers: {
                Authorization: `Bearer ${input.newToken}`
            },
            data: {
                "name": values["eventName"],
                "description": values["description"],
                "datetime": date,
                "location": values["location"],
                "fee": parseFloat(values["fee"])
            }
        }).then((response: StatusResponse) => {
            setSavedMessage("Saved!");
            return (response.data.code);
        }).catch(err => {
            setSavedMessage("Date of event must be in the future!")
            return -1;
        });
    };

    const updateEvent = async (values: any) => {
        let date = values["date"] + ":00-04:00";
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/clubs/${input.clubID}/events/${input.eventID}`,
            headers: {
                Authorization: `Bearer ${input.newToken}`
            },
            data: {
                "name": values["eventName"],
                "description": values["description"],
                "datetime": date,
                "location": values["location"],
                "fee": parseFloat(values["fee"])
            }
        }).then((response: StatusResponse) => {
            setSavedMessage("Saved!");
            return (response.data.code);
        }).catch(err => {
            setSavedMessage("Date of event must be in the future!")
            return -1
        });
    };

    let title = "";

    if (input.isNew) {
        title = "Create an Event!"
    }
    else {
        title = "Update Event"
    }

    const hide = () => {
        setEvent({ "id": -1, "name": "", "description": "", "datetime": "", "location": "", "fee": 0 });
        input.onHide();
    }

    const calculateMinDate = () => {
        const now = new Date();
        now.setDate(now.getDate() - 1);
        return now.toISOString().substring(0, 16);
    }

    const [savedMessage, setSavedMessage] = useState("");

    return (
        <Modal show={input.show} onHide={hide} className={styles.EventForm}>
            <Modal.Header closeButton>
                <Modal.Title className={styles.title + " mb-0 ml-4"}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.EventFormContent + " pt-4"}>

                <Formik
                    validationSchema={schema}
                    onSubmit={(values) => {
                        if (input.isNew) {
                            createEvent(values).then((response: number) => {
                                const fetchData = async () => {
                                    await axios({
                                        method: 'get', //you can set what request you want to be
                                        url: `/clubs/${input.clubID}/events`,
                                    })
                                        .then((result: any) => {
                                            input.setEvents(result.data.data.hosts);
                                        })
                                };
                                if (response === 1) {
                                    input.onHide();
                                    setSavedMessage("");
                                }
                                fetchData();
                            })
                        }
                        else {
                            updateEvent(values).then(() => {
                                const fetchData = async () => {
                                    await axios({
                                        method: 'get', //you can set what request you want to be
                                        url: `/clubs/${input.clubID}/events`,
                                    }).then((result: any) => {
                                        input.setEvents(result.data.data.hosts);
                                    }
                                    )
                                };
                                fetchData();
                            });
                        }
                    }
                    }
                    initialValues={{
                        eventName: `${event.name}`,
                        location: `${event.location}`,
                        date: `${event.datetime.substring(0, 16)}`,
                        description: `${event.description}`,
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
                                        defaultValue={`${event.name}` || ""}
                                        onChange={handleChange}
                                        isInvalid={!!errors.eventName}
                                        id="eventname"
                                    />

                                    <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                        {errors.eventName}
                                    </Form.Control.Feedback>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label className={styles.subtitle + " mt-3"}>Description</Form.Label>
                                    <Form.Control
                                        className={styles.inputBox}
                                        required
                                        as="textarea"
                                        rows={3}
                                        placeholder="Description of event"
                                        name="description"
                                        defaultValue={`${event.description}` || ""}
                                        onChange={handleChange}
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.inputBox}>{errors.description}</Form.Control.Feedback>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md={6}>
                                        <Form.Label className={styles.subtitle + " mt-3"}>Location</Form.Label>
                                        <Form.Control
                                            className={styles.inputBox}
                                            type="text"
                                            placeholder="Location"
                                            name="location"
                                            defaultValue={`${event.location}` || ""}
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
                                            type="datetime-local"
                                            placeholder="Date"
                                            name="date"
                                            defaultValue={`${event.datetime.substring(0, 16)}`}
                                            onChange={handleChange}
                                            isInvalid={!!errors.date}
                                            id="date"
                                            min={calculateMinDate()}
                                        />
                                        <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                            {errors.date}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>

                                    <Form.Label className={styles.subtitle + " mt-1"}>Fee</Form.Label>
                                    <Form.Control
                                        className={styles.inputBox}
                                        type="text"
                                        placeholder="Fee"
                                        name="fee"
                                        defaultValue={`${event.fee}` || ""}
                                        onChange={handleChange}
                                        isInvalid={!!errors.fee}
                                    />

                                    <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                        {errors.fee}
                                    </Form.Control.Feedback>

                                </Form.Row>

                                <Form.Row className="d-flex justify-content-end align-items-center mt-3">
                                    <div className={"mr-4 mb-0 mt-0 " + styles.subtitle}>{savedMessage} </div>
                                    <Button type="submit" className={styles.btnpurple + " mr-4"}>
                                        Save event
                                    </Button>
                                    <Button type="button" variant="outline-secondary" onClick={input.onHide}>
                                        CANCEL
                                    </Button>
                                </Form.Row>

                            </Form>
                        )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default EventForm;