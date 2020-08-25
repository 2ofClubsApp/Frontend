import React from 'react'
import {Container} from "react-bootstrap";
// import {useHistory} from 'react-router-dom'
import NavBar from "../../../components/NavBar/NavBar"
import { connect, MapDispatchToProps } from 'react-redux';
import { RootState } from '../../../store';
import jwt_decode from 'jwt-decode';
import UserRequestsTable from '../../../components/AdminPanel/UserRequestsTable/UserRequestsTable';
import { setLogin, setToken, setUsername, setExpiry } from '../../../store/actions/actions';


const UserRequests = (props: any) => {

    const decode = () => {
        const decoded = jwt_decode(props.token);
        return decoded;
    }

    decode();

    console.log("user requests " + props.token)
    
    return (
        <>
        <NavBar isSiteAdmin={true} userUsername={props.username} userToken={props.token} setLogin={props.onSetLogin} setToken={props.setToken}/>
        <Container className={"d-flex justify-content-center align-items-center mt-5"}>
            <UserRequestsTable newUsername={props.username} newToken={props.token}/>
        </Container>
        </>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRequests);
