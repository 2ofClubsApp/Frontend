import React, { useState, useEffect, ChangeEvent } from 'react'
import {Container, Row, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./AdminSettingsContainer.module.css"
import TagListing from "../TagsContainer/TagListing"
import {Formik} from "formik";
import * as yup from "yup";
import axios from "../../axios";
import { RootState } from '../../store';
import { connect } from 'react-redux';



type AdminSettingsDefinition = {
    inputToken: string
}

const AdminSettingsContainer = (input: AdminSettingsDefinition, props:any) => {

    type StatusResponse = {
        data: {
            Code: number,
            Message: string,
            Data: {}
        }
    }

    type dataResponse = {
        Code: number,
        Message: string,
        Data: {}
    }

    const [data, setData] = useState({ Tags: ["No tags yet!"] });
    const [fileData, setFile] = useState<any>({file: null});

    const newFileData = new FormData();
   
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
    
    const createTag = async (values: any) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/tags`,
            headers: {
                Authorization: `Bearer ${input.inputToken}`
            },
            data: {
                "Name": values["tag"],
            }
            }).then((response: StatusResponse) => {
                console.log(JSON.stringify(response.data.Message));
                return response.data
        }).catch(err => {
            console.log(err + " failed to submit tag");
        });
    };


    const schema = yup.object({
        tag: yup.string()
        .min(1, 'Tags must be at least 1 character')
        .max(24, 'Tags cannot be more than 24 characters')
        .required('A tag is required'),
        //image: yup.string().required(),
    });

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

    const fileUploadSchema = yup.mixed()
    .test('fileType', "Your Error Message", value => SUPPORTED_FORMATS.includes(value.type) )

    const file: string[] = [];

    const onChangeHandler = (e: any) => {
        const file = e.target.files[0];
        console.log(file.name);
        setFile({file: e.target.files[0]})
    }

    const uploadTag = async (values: any) => {
        console.log("uploading file called " + fileData.file);
        const formData = new FormData();
        const blob = fileData.file;
        formData.append("file", fileData.file);
        console.log(formData);
        return axios.post(`/upload/tags`, formData, {headers: {Authorization: `Bearer ${input.inputToken}`}})
                    .then((response:StatusResponse) => { console.log(response.data)})
    };

    return (
        <Container className={styles.container}>
                <Row>
                    <Col>
                            <span className={styles.subtitle}>Add to Available Tags</span>
                            <Row className="d-flex justify-content-center">
                                <p>Add tags one at a time or upload a .txt with each tag on a new line</p>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Col sm={12} md={12} lg={5} className="d-flex justify-content-center align-items-center m-2">
                                <Formik
                                    validationSchema={schema}
                                    onSubmit={async (values, actions) => {
                                        console.log(values.tag);
                                        createTag(values).then((result: any) => {
                                            if (result.Code === -1) {
                                                actions.setErrors({
                                                    tag: `${result.Message}`
                                                });
                                            }
                                            else {
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
                                                values.tag = ""
                                            }
                                            })
                                        return false;
                                        }
                                    }
                                    initialValues={{
                                        tag: ''
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
                                                <Form.Group as={Col} md="10" controlId="inputBox">
                                                    <Form.Control
                                                        className={styles.inputBox + "mr-2"}
                                                        type="text"
                                                        placeholder="Tag"
                                                        name="tag"
                                                        value={values.tag}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.tag}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.tag}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col} md="2" controlId="submitButton">
                                                    <Button variant="primary" type="submit">Add</Button>
                                                </Form.Group>
                                                
                                            </Form.Row>
                                            
                                        </Form>
                                    )}
                                    </Formik>
                                </Col>
                                <Col sm={12} md={12} lg={6} className="d-flex justify-content-center m-2">
                                    <Form onSubmit={async (values: any) => {
                                        uploadTag(values)}}>
                                        <Form.Row>
                                            <input
                                            type="file"
                                            id="file"
                                            aria-describedby="file"
                                            onChange={onChangeHandler}
                                            />
                                            <Button variant="primary" type="submit">Add</Button>
                                        </Form.Row>
                                    </Form>
                                
                                    
                                </Col>
                            </Row>

                            <span className={styles.subtitle}>Existing Tags</span>
                            <div className={styles.tagsContainer}>
                                <Form>
                                    {data.Tags.map((item: any) => (<TagListing key={item} id={item} label={item} checked={true} myVar={["None"]} setMyVar={null}/>))}
                                    <Button type="submit">Save</Button>
                                </Form>
                            </div>
                    </Col>
                </Row>
        </Container>

        )
};


export default AdminSettingsContainer;
