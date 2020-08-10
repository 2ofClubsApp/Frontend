import React from 'react'
import {ToggleButton, Container, Row, Image, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import formstyles from "../ClubForm/ClubForm.module.css"
import TagsContainer from "../TagsContainer/TagListing"
import { RootState } from '../../store';
import { connect } from 'react-redux';

type UserSettingsDefinition = {
    title: string
    username: string
    email: string
    children: React.ReactNode
}

const decode = (state: RootState) => {
    console.log(state.system.token);
    const token = state.system.token;
    return token;
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
                        <Form.Control readOnly placeholder={form.username} className={formstyles.inputBox} type="text"/>
                    </Row>
                    <Row>
                        <Form.Label className={formstyles.subtitle}>Email</Form.Label>
                        <Form.Control readOnly placeholder={form.email} className={formstyles.inputBox} type="email"/>
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

                    Tags container here
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

const mapStateToProps = (state: RootState) => {
    const token = state.system.token;
    console.log("token in usersettingsform is" + token);
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token
    }
}

export default connect(mapStateToProps)(UserSettingsForm);
