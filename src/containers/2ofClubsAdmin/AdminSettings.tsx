import React, { useState, useEffect } from 'react'
import {ToggleButton, Container, Row, Image, Form} from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar"
import AdminSettingsContainer from "../../components/AdminPanel/AdminSettingsContainer"
import {useHistory} from 'react-router-dom'
import { RootState } from '../../store';
import { connect } from 'react-redux';

type AdminSettingsDefinition = {
    title: string
    children: React.ReactNode
}

const AdminSettings = (props: any) => {
    const history = useHistory();
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };

    const [state, setState] = React.useState({
        username: "",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value
        const id = event.target.id
        setState({
            ...state,
            [id]: value
        })
    }
    
    return (
        <>
        <NavBar isSiteAdmin={true}></NavBar>
        <Container className={"d-flex justify-content-center align-items-center mt-5"}>
            <AdminSettingsContainer inputToken={props.token}></AdminSettingsContainer>
        </Container>
        </>
    )
};

const mapStateToProps = (state: RootState) => {
    const token = state.system.token;
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(AdminSettings);
