import React from 'react'
import {ToggleButton, Container, Row, Image, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./ClubApplicationComponent.module.css"
import TagsContainer from "../TagsContainer/TagListing"

type ClubDefinition = {
    username: string
    email: string
    name: string
    active: boolean
}

let activeText = "Active"

const ClubApplicationComponent = (club: ClubDefinition, activeText: string) => {
    if (club.active) {
        activeText = "Deactivate"
    }
    else {
        activeText = "Activate"
    }

    return (
        <Container className={styles.container}>
            <Row sm={12}>
                <Col>
                    <h1 className={styles.title}>Application</h1>
                </Col>
            </Row>
            <Row sm={12}>
                <Col>
                    <Row>
                        <Form.Label className={styles.subtitle}>Application Owner's Email</Form.Label>
                        <Form.Control disabled className={styles.inputBox} type="email" defaultValue={club.email}/>
                    </Row>
                    <Row>
                        <Form.Label className={styles.subtitle}>Club Name</Form.Label>
                        <Form.Control disabled className={styles.inputBox} type="text" defaultValue={club.name} />
                    </Row>
                    <Row>
                        <Form.Label className={styles.subtitle}>Bio</Form.Label>
                        <Form.Control disabled className={styles.inputBox} as={"textarea"} rows={3}/>
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
                        <Form.Label className={styles.subtitle}>Events</Form.Label>
                    </Row>
                </Col>
                <Col className={"ml-5"}>
                    <Form.Label className={styles.subtitle}>Tags</Form.Label>

                    




                    
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Row className={"d-flex justify-content-end align-items-center mt-5"}>
                        <Button style={{color:"#fff", backgroundColor:"#696de9", border:"none", textTransform:"uppercase"}} className={"mr-3 btn-danger"}>
                            {activeText}
                        </Button>
                        <Button style={{color:"#fff", backgroundColor:"#696de9", border:"none", textTransform:"uppercase"}}>
                            Modifications needed
                        </Button>
                    </Form.Row>
                    
                </Col>
            </Row>
        </Container>
    )
};

export default ClubApplicationComponent;
