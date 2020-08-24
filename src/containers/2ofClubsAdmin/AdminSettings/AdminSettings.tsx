import React from 'react'
import {Container} from "react-bootstrap";
import NavBar from "../../../components/NavBar/NavBar"
import TagSettingsContainer from "../../../components/AdminPanel/TagSettingsContainer/TagSettingsContainer"
import { RootState } from '../../../store';
import { connect } from 'react-redux';

const AdminSettings = (props: any) => {
    return (
        <>
            <NavBar isSiteAdmin={true} userUsername={props.username} userToken={props.token}></NavBar>
            <Container className={"d-flex justify-content-center align-items-center mt-5"}>
                <TagSettingsContainer userToken={props.token} />
            </Container>
        </>
    )
};

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(AdminSettings);
