import React, { useState, useEffect } from 'react'
import { Container, Row, Modal, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./ClubForm.module.css"
import { Formik } from "formik";
import * as yup from "yup";
import axios from "../../../axios";
import TagListing from '../../TagsContainer/TagListing';
import { tag, Club, StatusResponse } from "../../../types/DataResponses"
import EventForm from '../../Event/EventListing/EventForm';
import EventListingsTable from '../../Event/EventListing/EventListingsTable';
import ClubImage from '../ClubImage/ClubImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

type ClubFormDefinition = {
    title: string,
    isClub: boolean,
    token: string,
    clubObject: Club
    clubID: number
}


function ClubForm(input: ClubFormDefinition) {

    const schema = yup.object({
        clubName: yup.string()
            .required('A name for the club is required'),
        clubEmail: yup.string()
            .email('Invalid email')
            .required('A club email is required'),
        bio: yup.string()
            .max(150, 'Bios can be a maximum of 150 characters'),
        image: yup.string(),
        size: yup.number()
            .positive("Club size must be a positive number")
            .integer("Club size can't be a decimal!")
    });

    const create = async (values: any) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/clubs`,
            headers: {
                Authorization: `Bearer ${input.token}`
            },
            data: {
                "name": values["clubName"],
                "email": values["clubEmail"],
                "bio": values["bio"],
                "size": parseInt(values["size"])
            }
        }).then((response: StatusResponse) => {
            if (response.data.code === -1) {
                setSaved(-1);
            }
            else {
                setSaved(1);
            }
        }).catch(err => {
            console.log(err + " submit request failed");
            setSaved(-1);
        });
    };

    const updateClub = async (values: any) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/clubs/${input.clubObject.id}`,
            headers: {
                Authorization: `Bearer ${input.token}`
            },
            data: {
                "bio": values["bio"],
                "size": parseInt(values["size"])
            }
        }).then((response: StatusResponse) => {
            return (response.data)
        }).catch(err => {
            console.log(err + " update club failed");
        });
    };

    const updateClubTags = async (values: any) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/clubs/${input.clubObject.id}/tags`,
            headers: {
                Authorization: `Bearer ${input.token}`
            },
            data: {
                "Tags": clubData
            }
        }).then((response: StatusResponse) => {
            return (response.data)
        }).catch(err => {
            console.log(err + " update club tags failed");
        });
    };

    const deleteEvent = async (clubID: number, eventID: number) => {
        return axios({
            method: 'delete', //you can set what request you want to be
            url: `/clubs/${clubID}/events/${eventID}`,
            headers: {
                Authorization: `Bearer ${input.token}`
            },
        }).then((response: StatusResponse) => {
            return (response.data)
        }).catch(err => {
            console.log(err + " delete event failed");
        });
    };

    const uploadImage = async (values: any) => {
        if (imageVerify) {
            const formData = new FormData();
            formData.append("file", fileData.file);
            return axios.post(`/upload/photos/clubs/${input.clubID}`, formData, { headers: { Authorization: `Bearer ${input.token}` } })
                .then((response: StatusResponse) => {
                    setImgURL("");
                    const fetchData = async () => {
                        await axios({
                            method: 'get', //you can set what request you want to be
                            url: `/photos/clubs/${input.clubID}`,
                        }).then((response: any) => {
                            setImgURL(response.config.baseURL + response.config.url);
                            return (response.data)
                        }).catch(err => {
                            console.log(err + " uploading image failed");
                        });
            
                    }
                    fetchData();
                })
        }
        else {
            return -1;
        }

    };

    const [data, setData] = useState([{ id: -1, name: "N/A", isActive: true }]);
    const [clubData, setClubData] = useState(["None"]);
    const [saved, setSaved] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: 'get', //you can set what request you want to be
                url: `/tags/active`
            })
                .then((result: any) => {
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
                url: `/clubs/${input.clubID}`,
                headers: {
                    Authorization: `Bearer ${input.token}`
                },
            })
            const tagsArray = result.data.data.tags;
            if (tagsArray !== []) {
                const tagNamesArray = tagsArray.map((item: tag) => item.name);
                setClubData(tagNamesArray);
            }
            else {
                return ["None"]
            }
        };
        if (input.clubID !== -1) {
            fetchData();
        }
    }, [input.clubID, input.token]);


    const renderTags = () => {
        return data.map((item: any) => (<TagListing admin={false} key={item.name} id={item.id} label={item.name} checked={clubData.includes(item.name)} myVar={clubData} setMyVar={setClubData} myVar2={["N/A"]} setMyVar2={null} />))
    }

    const savedMessage = () => {
        if (saved === 0) {
            return "";
        }
        else if (saved === 1) {
            return "Saved!";
        }
        else if (saved === -2) {
            return "Image does not fit guidelines"
        }
        else {
            return "Something went wrong, please try again later";
        }
    }

    const [showEventForm, setShowEventForm] = useState(false);

    const handleCloseEventForm = () => setShowEventForm(false);
    const handleShowEventForm = () => setShowEventForm(true);

    const showNewEventForm = () => {
        setIsNew(true);
        handleShowEventForm();
    }

    const [events, setEvents] = useState([{ "id": -1, "name": "N/A", "description": "", "datetime": "", "location": "", "fee": 1 }]);

    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: 'get', //you can set what request you want to be
                url: `/clubs/${input.clubID}/events`,
            }).then((result: any) => {
                setEvents(result.data.data.hosts);
            }
            )
        };

        fetchData();
    }, [input.clubID]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [clubID, setClubID] = useState(-1);
    const [eventID, setEventID] = useState(-1);

    const deletePopup = (clubID: number, eventID: number) => {
        setClubID(clubID);
        setEventID(eventID);
        handleShow();
    }

    const deleteConfirmed = () => {
        deleteEvent(clubID, eventID).then(() => {
            const fetchData = async () => {
                await axios({
                    method: 'get', //you can set what request you want to be
                    url: `/clubs/${input.clubID}/events`,
                }).then((result: any) => {
                    setEvents(result.data.data.hosts);
                }
                )
            };

            fetchData();
        }
        );
    }

    const [isNew, setIsNew] = useState(true);

    const [fileData, setFile] = useState<any>({ file: null });

    const [imageVerify, setImageVerify] = useState(false);

    const onChangeHandler = (e: any) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            let fileExtension, fileSize;

            // File name and extension
            fileExtension = file.type;
            fileSize = file.size;
            if ((fileExtension === 'image/png' || fileExtension === 'image/jpg' || fileExtension === 'image/jpeg') && ((fileSize/(1048*1048)) < 10) ) {
                readImageFile(file);             // GET IMAGE INFO USING fileReader().
            }
            else {
                setImageVerify(false);
            }
        }
        setFile({ file: e.target.files[0] })
    }

    const readImageFile = (file: any) => {
        let reader = new FileReader();

        reader.onload = function (e: any) {
            let img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                setImageVerify(img.width === img.height);
            }
        }
        reader.readAsDataURL(file);
    }

    const [imgURL, setImgURL] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: 'get', //you can set what request you want to be
                url: `/photos/clubs/${input.clubID}`,
            }).then((response: any) => {
                setImgURL(response.config.baseURL + response.config.url);
                return (response.data)
            }).catch(err => {
                console.log(err + " submission failed");
            });

        }
        fetchData();
    }, [input.clubID]);


    if (input.clubID === -1) {
        return (
            <Container className={styles.container}>
                <Row>
                    <Col>
                        <h1 className={styles.title}>Tell us more about your club!</h1>
                    </Col>
                </Row>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values) => {
                        create(values)
                    }}
                    initialValues={{
                        clubName: "",
                        clubEmail: '',
                        bio: '',
                        size: 1,
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
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="validationFormik01">
                                        <Form.Label className={styles.subtitle}>Club Name</Form.Label>
                                        <Form.Control
                                            className={styles.inputBox}
                                            type="text"
                                            placeholder="Club Name"
                                            name="clubName"
                                            value={values.clubName || ''}
                                            onChange={handleChange}
                                            isInvalid={!!errors.clubName}
                                        />

                                        <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                            {errors.clubName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="validationFormik03">
                                        <Form.Label className={styles.subtitle}>Club Email</Form.Label>
                                        <Form.Control
                                            className={styles.inputBox}
                                            type="text"
                                            placeholder="Club Email"
                                            name="clubEmail"
                                            value={values.clubEmail || ''}
                                            onChange={handleChange}
                                            isInvalid={!!errors.clubEmail}
                                        />

                                        <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                            {errors.clubEmail}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="bio">
                                        <Form.Label className={styles.subtitle}>Bio</Form.Label>
                                        <Form.Control
                                            className={styles.inputBox}
                                            required
                                            as="textarea"
                                            rows={3}
                                            name="bio"
                                            value={values.bio || ''}
                                            onChange={handleChange}
                                            isInvalid={!!errors.bio}
                                        />
                                        <Form.Control.Feedback type="invalid" className={styles.inputBox}>{errors.bio}</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="validationFormik03">
                                        <Form.Label className={styles.subtitle}>Size of Club</Form.Label>
                                        <Form.Control
                                            className={styles.inputBox}
                                            type="text"
                                            placeholder="Size"
                                            name="size"
                                            defaultValue={values.size || ''}
                                            onChange={handleChange}
                                            isInvalid={!!errors.size}
                                        />

                                        <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                            {errors.size}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row className="d-flex justify-content-end align-items-center">
                                    <div className={"mr-4 mb-0 mt-0 " + styles.subtitle}>{savedMessage()} </div>
                                    <Button type="submit" className={"float-right " + styles.btnpurple}>
                                        SUBMIT FOR REVIEW
                            </Button>
                                </Form.Row>

                            </Form>
                        )}
                </Formik>
            </Container>

        )
    }

    else {
        return (
            <>
                <Modal show={show} onHide={handleClose} dialogClassName="w-25" centered={true}>
                    <Modal.Header closeButton />
                    <Modal.Body>Are you sure you want to delete this event?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => { deleteConfirmed(); handleClose() }}>
                            Delete Event
                    </Button>
                        <Button variant="light" onClick={handleClose}>
                            Cancel
                    </Button>
                    </Modal.Footer>
                </Modal>
                <EventForm isNew={isNew} show={showEventForm} onHide={handleCloseEventForm} newToken={input.token} clubID={input.clubID} events={events} setEvents={setEvents} eventID={eventID} />
                
                <Container className={styles.container}>
                    <Row>
                        <Col>
                            <h1 className={styles.title}>Tell us more about your club!</h1>
                        </Col>
                    </Row>
                    <Formik
                        validationSchema={schema}
                        onSubmit={(values) => {
                            updateClub(values)
                            updateClubTags(values);
                            uploadImage(values);
                            if ((!imageVerify) && (fileData.file !== null)) {
                                setSaved(-2);
                            }
                            else {
                                setSaved(1);
                            }
                        }
                        }
                        initialValues={{
                            clubName: `${input.clubObject.name}`,
                            clubEmail: `${input.clubObject.email}`,
                            bio: `${input.clubObject.bio}`,
                            size: `${input.clubObject.size}`,
                            image: '',
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
                                            <Form.Label className={styles.subtitle}>Club Name</Form.Label>
                                            <Form.Control
                                                className={styles.inputBox}
                                                type="text"
                                                placeholder="Club Name"
                                                name="clubName"
                                                value={input.clubObject.name || ""}
                                                onChange={handleChange}
                                                isInvalid={!!errors.clubName}
                                                disabled

                                            />

                                            <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                                {errors.clubName}
                                            </Form.Control.Feedback>

                                            <Form.Label className={styles.subtitle + " mt-3"}>Club Email</Form.Label>
                                            <Form.Control
                                                className={styles.inputBox}
                                                type="text"
                                                placeholder="Club Email"
                                                name="clubEmail"
                                                value={input.clubObject.email || ''}
                                                onChange={handleChange}
                                                isInvalid={!!errors.clubEmail}
                                                disabled
                                            />

                                            <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                                {errors.clubEmail}
                                            </Form.Control.Feedback>

                                            <Form.Label className={styles.subtitle + " mt-3"}>Bio</Form.Label>
                                            <Form.Control
                                                className={styles.inputBox}
                                                required
                                                as="textarea"
                                                rows={3}
                                                name="bio"
                                                defaultValue={input.clubObject.bio || ''}
                                                onChange={handleChange}
                                                isInvalid={!!errors.bio}
                                            />
                                            <Form.Control.Feedback type="invalid" className={styles.inputBox}>{errors.bio}</Form.Control.Feedback>

                                            <Form.Label className={styles.subtitle  + " mt-3"}>Size of Club</Form.Label>
                                            <Form.Control
                                                className={styles.inputBox}
                                                type="text"
                                                placeholder="Size"
                                                name="size"
                                                defaultValue={input.clubObject.size || ''}
                                                onChange={handleChange}
                                                isInvalid={!!errors.size}
                                            />
                                            <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                                {errors.size}
                                            </Form.Control.Feedback>

                                            <div className="d-flex justify-content-between align-items-center mb-0">
                                                <Form.Label className={styles.subtitle + " mt-5"}>Events</Form.Label>
                                                <Button className="mt-4" onClick={showNewEventForm}>+</Button>
                                            </div>

                                            <EventListingsTable userToken={input.token} clubID={input.clubID} myVar={events} setMyVar={setEvents} deleteCommand={deletePopup} setIsNew={setIsNew} updateCommand={handleShowEventForm} setEventID={setEventID} />
                                        </Form.Group>

                                        <Form.Group as={Col} md="6" className={"pl-5"}>
                                            <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
                                                <ClubImage imgURL={imgURL} clubName={input.clubObject.name}/>
                                            </div>
                                            <Form.Row>
                                                <Form.Group as={Col} className="mb-0">
                                                    <Form.Label className={styles.subtitle + " mt-3 mb-0"}>Club Logo</Form.Label>
                                                    <Form.File
                                                        className={styles.inputBox}
                                                        required
                                                        name="image"
                                                        onChange={onChangeHandler}
                                                        //isInvalid={!!errors.image}
                                                        feedback={errors.image}
                                                        id="image"
                                                    />
                                                    <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                                        {errors.image}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col} className={styles.note + " text-muted mb-0"}>
                                                    <FontAwesomeIcon icon={faInfoCircle}/> Images must be:
                                                    <ul className="mb-0">
                                                        <li>.jpg or .png</li>
                                                        <li>less than 10MB</li>
                                                        <li>have a 1:1 ratio</li>
                                                    </ul> 
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Label className={styles.subtitle + " mt-0"}>Tags</Form.Label>
                                            <div className={styles.tagsContainer}>
                                                {renderTags()}
                                            </div>
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
            </>
        )
    }
};

export default ClubForm;
