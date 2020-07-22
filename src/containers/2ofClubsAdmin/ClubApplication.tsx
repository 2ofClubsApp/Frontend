import React from 'react'
import {ToggleButton, Container, Row, Image, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import NavBar from "../../components/NavBar/NavBar"
import ClubApplicationContainer from "../../components/ClubApplication/ClubApplicationComponent"

type AdminSettingsDefinition = {
    username: string
    email: string
    name: string
    title: string
    children: React.ReactNode
}

const ClubApplication = (form: AdminSettingsDefinition) => {

    return (
        <>
            <NavBar isSiteAdmin={true}></NavBar>
            <Container className={"d-flex justify-content-center align-items-center mt-5"}>
                <ClubApplicationContainer username={"JohnSmith"} email={"example@email.com"} name={"ACS"} active={true} ></ClubApplicationContainer>
            </Container>
        </>
    )
};

export default ClubApplication;
