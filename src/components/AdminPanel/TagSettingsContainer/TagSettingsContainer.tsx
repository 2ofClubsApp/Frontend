import React, { useState, useEffect} from 'react'
import {Container, Row, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./TagSettingsContainer.module.css"
import TagListing from "../../TagsContainer/TagListing"
import {Formik} from "formik";
import * as yup from "yup";
import axios from "../../../axios";
import {StatusResponse, tag} from "../../../types/DataResponses"

type AdminSettingsDefinition = {
    userToken: string
}

const TagSettings = ( input: AdminSettingsDefinition ) => {
    const [fileData, setFile] = useState<any>({file: null});
    const [data, setData] = useState([{id: -1, name: "N/A", isActive: true}]);
    const [userData, setUserData] = useState(["None"]);
    const [saved, setSaved] = useState(false);
    const [toggledTags, setToggledTags] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: 'get', //you can set what request you want to be
                url: `/tags`})
            .then ( (result: any) => {
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
                url: `/tags/active`,
            })
            const tagsArray = result.data.data;
            if (tagsArray !== []){
                const tagNamesArray = tagsArray.map((item: tag) => item.name);
                setUserData(tagNamesArray);
            }
            else{
                return ["None"]
            }
            
        };
        fetchData();
    }, []);

    const renderTags = () => {
        return data.map((item: any) => (<TagListing admin={true} key={item.name} id={item.id} label={item.name} checked={userData.includes(item.name)} myVar={userData} setMyVar={setUserData} myVar2={toggledTags} setMyVar2={setToggledTags} />))
    }
    
    const createTag = async (values: any) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/tags`,
            headers: {
                Authorization: `Bearer ${input.userToken}`
            },
            data: {
                "Name": values["tag"],
            }
            }).then((response: any) => {
                console.log(JSON.stringify(response));
                if (response.data.code === 1) {
                    setSaved(true);
                }
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
    });


    const onChangeHandler = (e: any) => {
        const file = e.target.files[0];
        console.log(file.name);
        setFile({file: e.target.files[0]})
    }

    const uploadTag = async (values: any) => {
        console.log("uploading file called " + fileData.file);
        const formData = new FormData();
        formData.append("file", fileData.file);
        console.log(formData);
        return axios.post(`/upload/tags`, formData, {headers: {Authorization: `Bearer ${input.userToken}`}})
                    .then((response:StatusResponse) => { 
                        console.log(response.data)
                        const fetchData = async () => {
                            await axios({
                                method: 'get', //you can set what request you want to be
                                url: `/tags`}).then((result: any) => {
                                    console.log(result.data.data);
                                    setData(result.data.data);})
                            await axios({
                                method: 'get', //you can set what request you want to be
                                url: `/tags/active`,
                            }).then((result2: any) => {
                                const tagsArray = result2.data.data;
                                if (tagsArray !== []){
                                    const tagNamesArray = tagsArray.map((item: tag) => item.name);
                                    setUserData(tagNamesArray);
                                    setToggledTags([])
                                }
                                else{
                                    return ["None"];
                                }})
                            };
                
                        fetchData();
                    })
    };

    const toggleTags = () => {
        toggledTags.map((item: string) => toggleTag(item));
        setSaved(true);
    }

    const toggleTag = async (tagName: string) => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/toggle/tags/${tagName}`,
            headers: {
                Authorization: `Bearer ${input.userToken}`
            },
            }).then((response: any) => {
                console.log(JSON.stringify(response));
                return response.data
        }).catch(err => {
            console.log(err + " failed to submit tag");
        });
    };

    const savedMessage = () => {
        if (saved) {
            return "Saved!";
        }
        else {
            return "";
        }
    }

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
                                        createTag(values).then((result: any) => {
                                            if (result.code === -1) {
                                                actions.setErrors({
                                                    tag: `${result.Message}`
                                                });
                                            }
                                            else {
                                                const fetchData = async () => {
                                                    await axios({
                                                        method: 'get', //you can set what request you want to be
                                                        url: `/tags`}).then((result: any) => {
                                                            console.log(result.data.data);
                                                            setData(result.data.data);})
                                                    await axios({
                                                        method: 'get', //you can set what request you want to be
                                                        url: `/tags/active`,
                                                    }).then((result2: any) => {
                                                        const tagsArray = result2.data.data;
                                                        if (tagsArray !== []){
                                                            const tagNamesArray = tagsArray.map((item: tag) => item.name);
                                                            setUserData(tagNamesArray);
                                                        }
                                                        else{
                                                            return ["None"];
                                                        }})
                                                    };
                                        
                                                fetchData();
                                                values.tag = ""
                                                actions.setErrors({
                                                    tag: ``
                                                });
                                            }
                                            })
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
                                                    <Button className={styles.btnpurple} type="submit">Add</Button>
                                                </Form.Group>
                                                
                                            </Form.Row>
                                            
                                        </Form>
                                    )}
                                    </Formik>
                                </Col>
                                <Col sm={12} md={12} lg={6} className="d-flex justify-content-center m-2">
                                    <Form onSubmit={(e: any) => e.preventDefault()}>
                                        <Form.Row>
                                            <input
                                            type="file"
                                            id="file"
                                            aria-describedby="file"
                                            onChange={onChangeHandler}
                                            />
                                            <Button className={styles.btnpurple} type="submit" onClick={async (values: any) => {
                                            uploadTag(values)}}>Add</Button>
                                        </Form.Row>
                                    </Form>
                                
                                    
                                </Col>
                            </Row>

                            <span className={styles.subtitle}>Existing Tags</span>
                            
                                <Form onSubmit={(e:any) => e.preventDefault()}>
                                    <div className={styles.tagsContainer}>
                                        {renderTags()}
                                    </div>
                                    <div className={"d-flex justify-content-end align-items-center mt-2 mr-2"}>
                                        <div className={"mr-4 mb-0 mt-0 " + styles.subtitle}>{savedMessage()} </div>
                                        <Button type="submit" className={styles.btnpurple} onClick={async () => {toggleTags()}}>Update Tags</Button>
                                    </div>
                                </Form>
                            
                    </Col>
                </Row>
        </Container>

        )
};


export default TagSettings;
