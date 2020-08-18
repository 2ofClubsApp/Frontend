import React, {useState, useEffect} from 'react'
import {Container, Row, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./ClubForm.module.css"
import {Formik} from "formik";
import * as yup from "yup";
import axios from "../../axios";
import TagListing from '../TagsContainer/TagListing';


type ClubFormDefinition = {
    title: string,
    // children: React.ReactNode,
    isClub: boolean,
    token: string,
    clubObject: Club
    clubID: number
}

type Club = {
    id: number,
    name: string,
    email: string,
    bio: string,
    size: number,
    tags: string[],
    hosts: string[]
}

function ClubForm(input: ClubFormDefinition) {

    console.log("club is is "+ input.clubID);
    
    const schema = yup.object({
        clubName: yup.string()
        .required('A name for the club is required'),
        clubEmail: yup.string()
        .email('Invalid email')
        .required('A club email is required'),
        bio: yup.string()
        .max(150, 'Bios can be a maximum of 150 characters'),
        //image: yup.string().required(),
        size: yup.number()
        .positive("Club size must be a positive number")
        .integer("Club size can't be a decimal!")
    });

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

    const create = async (values: any) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/clubs`,
            headers: {
                Authorization: `Bearer ${input.token}`
            },
            data: {
                "Name": values["clubName"],
                "Email": values["clubEmail"],
                "Bio": values["bio"],
                "Size": values["size"]
            }
            }).then((response: StatusResponse) => {
                console.log(JSON.stringify(response.data.Message));
        }).catch(err => {
            console.log(err + " submission failed");
        });
    };

    const update = async (values: any) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/clubs/${input.clubObject.id}`,
            headers: {
                Authorization: `Bearer ${input.token}`
            },
            data: {
                "Name": values["clubName"],
                "Email": values["clubEmail"],
                "Bio": values["bio"],
                "Size": parseInt(values["size"])
            }
            }).then((response: StatusResponse) => {
                console.log(JSON.stringify(response.data.Message));
                return (response.data)
        }).catch(err => {
            console.log(err + " submission failed");
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
                console.log(JSON.stringify(response.data.Message));
                return (response.data)
        }).catch(err => {
            console.log(err + " submission failed");
        });
    };

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = (result: DataResponse) => {
    //     if (result.Code === 1){
    //         setPopupMsg({header: "Yay!", body: "Club was successfully updated!"})
    //     }
    //     else {
    //         setPopupMsg({header: "Whoops!", body:`An error occurred please try again later or contact an administrator {"\n"} (Error code ${result.Code}: ${result.Message})`})
    //     }
    //     setShow(true);
    // };

    // const [popupMsg, setPopupMsg] = useState({header: "", body: ""})


    // const get = async (values: any) => {
    //     return axios({
    //         method: 'get', //you can set what request you want to be
    //         url: `/clubs/${input.clubID}`,
    //         headers: {
    //             Authorization: `Bearer ${input.token}`
    //         },
    //         data: {
    //             "Name": values["clubName"],
    //             "Email": values["clubEmail"],
    //             "Bio": values["bio"],
    //             "Size": values["size"]
    //         }
    //         }).then((response: StatusResponse) => {
    //             console.log(JSON.stringify(response.data.Message));
    //     }).catch(err => {
    //         console.log(err + " submission failed");
    //     });
    // };

    console.log(input.clubObject);
    const [data, setData] = useState({ Tags: ["No tags yet!"] });
    const [clubData, setClubData] = useState(["No tags yet!"]);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/tags`})
            if (result.data.data.tags === null) {
                const tags = {Tags: ["No tags yet!"]}
                setData(tags);
            }
            else {
                setData(result.data.data);
            }
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
            setClubData(result.data.data.tags);
        };
        if (input.clubID !== -1) {
            fetchData();
        }
    }, [input.clubID, input.token]);
    

    const renderTags = () => {
        console.log(data)
        return data.Tags.map((item: string) => (<TagListing key={item} id={item} label={item} checked={clubData.includes(item)} myVar={clubData} setMyVar={setClubData}/>))
    }

    const savedMessage = () => {
        if (saved) {
            return "Saved!";
        }
        else {
            return "";
        }
    }


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
                        image: '',
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

                            <Form.Group as={Col} md="6" controlId="clubImage">
                            <Form.Label className={styles.subtitle}>Club Image</Form.Label>
                            <Form.File
                                className={styles.inputBox}
                                required
                                name="image"
                                onChange={handleChange}
                                //isInvalid={!!errors.image}
                                feedback={errors.image}
                                id="validationFormik107"
                                />
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
                                value={values.size || ''}
                                onChange={handleChange}
                                isInvalid={!!errors.size}
                            />

                            <Form.Control.Feedback type="invalid" className={styles.inputBox}>
                                {errors.size}
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="d-flex justify-content-end">
                            <Button type="submit" className={"float-right"} style={{color:"#fff", backgroundColor:"#696de9", border:"none", textTransform:"uppercase"}}>
                                Submit request for review
                            </Button>
                        </Form.Row>
                        
                        </Form>
                    )}
                    </Formik>
            </Container>

        )
    }
    else {
        // EDITING CLUB HERE
        // const name = data["Name"]
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
                        console.log("submitting")
                        update(values)
                        .then((result: any) => {
                            console.log(result)               
                        });
                        updateClubTags(values);
                        setSaved(true);
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
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="clubImage" className={"pl-5"}>
                            <Form.Label className={styles.subtitle}>Club Image</Form.Label>
                            <Form.File
                                className={styles.inputBox}
                                required
                                name="image"
                                onChange={handleChange}
                                //isInvalid={!!errors.image}
                                feedback={errors.image}
                                id="validationFormik107"
                                />
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
                            </Form.Group>

                            <Form.Group as={Col} md={6} className={"pl-5"}>
                                <Form.Label className={styles.subtitle}>Tags</Form.Label>
                                <div className={styles.tagsContainer}>
                                    {renderTags()}
                                </div>
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
                                value={input.clubObject.size || ''}
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
                            <Button type="submit" className={"float-right"} style={{color:"#fff", backgroundColor:"#696de9", border:"none", textTransform:"uppercase"}}>
                                Save settings
                            </Button>
                        </Form.Row>
                        
                        </Form>
                    )}
                    </Formik>
            </Container>

        )
    }
};

export default ClubForm;
