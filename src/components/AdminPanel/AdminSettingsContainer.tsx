import React from 'react'
import {ToggleButton, Container, Row, Image, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./AdminSettingsContainer.module.css"
import TagsContainer from "../TagsContainer/TagsContainer"

type AdminSettingsDefinition = {
}

const AdminSettingsContainer = (form: AdminSettingsDefinition) => {

    return (

        <Container className={styles.container}>
            <Form>
                <Row>
                    <Col>
                        <Form.Label className={styles.subtitle}>Add to Available Tags</Form.Label>
                        <Form.Row className="d-flex justify-content-center">
                            <p>Add tags one at a time or upload a .txt with each tag on a new line</p>
                        </Form.Row>
                        <Form.Row className="d-flex justify-content-center">
                            <Col sm={12} md={12} lg={5} className="d-flex justify-content-center align-items-center m-2">
                                <Form.Control placeholder="Add one tag at a time" className={"mr-3 w-75"}/>
                                <Button variant="primary" type="submit">Add</Button>
                            </Col>
                            <Col sm={12} md={12} lg={4} className="d-flex justify-content-center align-items-center m-2">
                                <Form.File id="uploadfile"/>
                                <Button variant="primary" type="submit">Submit</Button>
                            </Col>
                        </Form.Row>

                        <Form.Label className={styles.subtitle}>Existing Tags</Form.Label>
                        <TagsContainer>

                        </TagsContainer>
                    </Col>
                </Row>
            </Form>
        </Container>

        )
};

export default AdminSettingsContainer;
