import React from 'react'
import {Container} from "react-bootstrap";
import '../../../app.css';
// import {useHistory} from 'react-router-dom'
import NavBar from "../../../components/NavBar/NavBar"
import { RootState } from '../../../store';
import { connect } from 'react-redux';
import ClubRequestsTable from '../../../components/AdminPanel/ClubRequestsTable/ClubRequestsTable';

const ClubRequests = (props:any) => {
    
    return (
        <>
        <NavBar isSiteAdmin={true} userUsername={props.username} userToken={props.token}></NavBar>
        <Container className={"d-flex justify-content-center align-items-center mt-5"}>
            <ClubRequestsTable newUsername={props.username} newToken={props.token} />
        </Container>
        </>
    )
}


const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(ClubRequests);
