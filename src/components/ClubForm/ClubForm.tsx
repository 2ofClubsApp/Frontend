import React from 'react'
import {ToggleButton, Container, Row, Image, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./ClubForm.module.css"
import TagsContainer from "../TagsContainer/TagsContainer"

type ClubFormDefinition = {
    title: string
    children: React.ReactNode
}

const ClubForm = (form: ClubFormDefinition) => {

    return (
        <Container className={styles.container}>
            <Row>
                <Col>
                    <h1 className={styles.title}>Tell us more about your club!</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Row>
                        <Form.Label className={styles.subtitle}>Club Name</Form.Label>
                        <Form.Control className={styles.inputBox} as={"textarea"} rows={1}/>
                    </Row>
                    <Row>
                        <Form.Label className={styles.subtitle}>Bio</Form.Label>
                        <Form.Control className={styles.inputBox} as={"textarea"} rows={3}/>
                    </Row>
                </Col>
                <Col xs={6} md={4}>
                    <Image className={"float-right"} style={{margin: "10px"}}
                           src={process.env.PUBLIC_URL + "/banana.jpg"} rounded/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Row>
                        <Form.Label className={styles.subtitle}>Club Size</Form.Label>
                        <Form.Control size={"sm"} className={styles.inputBox} as={"select"}>
                            <option>Less than 10 Members</option>
                            <option>10-19 Members</option>
                            <option>20-39 Members</option>
                            <option>30+ Members</option>
                        </Form.Control>
                    </Row>
                    <Row>
                        <Form.Label className={styles.subtitle}>Looking for Help?</Form.Label>
                        <Form.Check className={styles.subtitle} type={"switch"} id={"helpNeeded"} label={""}/>
                    </Row>
                    <Row>
                        <Form.Label className={styles.subtitle}>Events</Form.Label>
                    </Row>
                </Col>
                <Col className={"ml-5"}>
                    <Form.Label className={styles.subtitle}>Tags</Form.Label>

                    <TagsContainer>

                    </TagsContainer>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className={"float-right mt-5"} style={{color:"#fff", backgroundColor:"#696de9", border:"none", textTransform:"uppercase"}}>
                        {form.title}
                    </Button>
                </Col>
            </Row>
        </Container>

    )
};

export default ClubForm;
