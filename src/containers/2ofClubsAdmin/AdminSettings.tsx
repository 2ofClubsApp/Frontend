import React from 'react'
import {Container} from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar"
import AdminSettingsContainer from "../../components/AdminPanel/AdminSettingsContainer"
//import {useHistory} from 'react-router-dom'
import { RootState } from '../../store';
import { connect } from 'react-redux';

const AdminSettings = (props: any) => {
    // const history = useHistory();
    // const changeRoute = (path: string) => {
    //     history.replace({pathname: path})
    // };

    return (
        <>
        <NavBar isSiteAdmin={true} userUsername={props.username} userToken={props.token}></NavBar>
        <Container className={"d-flex justify-content-center align-items-center mt-5"}>
            <AdminSettingsContainer inputToken={props.token}></AdminSettingsContainer>
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
