import React from 'react'
import {ToggleButton, Container, Row, Image, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import NavBar from "../../components/NavBar/NavBar"
import AdminSettingsContainer from "../../components/AdminPanel/AdminSettingsContainer"

type AdminSettingsDefinition = {
    title: string
    children: React.ReactNode
}

const AdminSettings = (form: AdminSettingsDefinition) => {

    return (
        <>
        <NavBar isSiteAdmin={true}></NavBar>
        <Container className={"d-flex justify-content-center align-items-center mt-5"}>
            <AdminSettingsContainer></AdminSettingsContainer>
        </Container>
        </>
    )
};

export default AdminSettings;
