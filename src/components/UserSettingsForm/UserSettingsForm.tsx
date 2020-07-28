import React from 'react'
import {ToggleButton, Container, Row, Image, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import formstyles from "../ClubForm/ClubForm.module.css"
import TagsContainer from "../TagsContainer/TagsContainer"

type UserSettingsDefinition = {
    title: string
    children: React.ReactNode
}

const UserSettingsForm = (form: UserSettingsDefinition) => {
    return (
        <Container className={formstyles.container}>
            <Row>
                <Col>
                    <h1 className={formstyles.title}>Tell us more about yourself!</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Row>
                        <Form.Label className={formstyles.subtitle}>Username</Form.Label>
                        <Form.Control readOnly placeholder="JohnSmith" className={formstyles.inputBox} type="text"/>
                    </Row>
                    <Row>
                        <Form.Label className={formstyles.subtitle}>Email</Form.Label>
                        <Form.Control readOnly placeholder="example@email.com" className={formstyles.inputBox} type="email"/>
                    </Row>
                    <Row>
                        <Form.Label className={formstyles.subtitle}>Current Password</Form.Label>
                        <Form.Control className={formstyles.inputBox} type="password"/>
                    </Row>
                    <Row>
                        <Form.Label className={formstyles.subtitle}>New Password</Form.Label>
                        <Form.Control className={formstyles.inputBox} type="password"/>
                    </Row>
                    <Row>
                        <Form.Label className={formstyles.subtitle}>Confirm New Password</Form.Label>
                        <Form.Control className={formstyles.inputBox} type="password"/>
                    </Row>
                    
                </Col>
                <Col className={"ml-5"}>
                    <Form.Label className={formstyles.subtitle}>Tags</Form.Label>

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

export default UserSettingsForm;
