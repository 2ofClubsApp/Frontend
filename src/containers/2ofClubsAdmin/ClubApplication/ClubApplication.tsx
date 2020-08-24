import React from 'react'
import {Container} from "react-bootstrap";
import NavBar from "../../../components/NavBar/NavBar"
import ClubApplicationContainer from "../../../components/AdminPanel/ClubApplication/ClubApplicationComponent"

type ClubApplicationDefinition = {
    username: string
    email: string
    name: string
    token: string
    title: string
    children: React.ReactNode
}

const ClubApplication = (input: ClubApplicationDefinition) => {

    return (
        <>
            <NavBar isSiteAdmin={true} userUsername={input.username} userToken={input.token}></NavBar>
            <Container className={"d-flex justify-content-center align-items-center mt-5"}>
                <ClubApplicationContainer username={"JohnSmith"} email={"example@email.com"} name={"ACS"} active={true} ></ClubApplicationContainer>
            </Container>
        </>
    )
};

export default ClubApplication;
