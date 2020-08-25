import React from 'react'
import { Container } from "react-bootstrap";
import '../../../app.css';
import NavBar from "../../../components/NavBar/NavBar"
import { RootState } from '../../../store';
import { connect, MapDispatchToProps } from 'react-redux';
import ClubRequestsTable from '../../../components/AdminPanel/ClubRequestsTable/ClubRequestsTable';
import { setLogin, setToken, setUsername, setExpiry } from '../../../store/actions/actions';

const ClubRequests = (props:any) => {
    
    return (
        <>
        <NavBar isSiteAdmin={true} userUsername={props.username} userToken={props.token} setLogin={props.onSetLogin} setToken={props.setToken}/>
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

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, null>) => {
    return {
        onSetLogin: (isLogged: boolean) => dispatch(setLogin(isLogged)),
        setToken: (token: string) => dispatch(setToken(token)),
        setUsername: (username: string) => dispatch(setUsername(username)),
        setExpiry: (date: number) => dispatch(setExpiry(date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubRequests);
