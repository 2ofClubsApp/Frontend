import React from 'react'
import {Container} from "react-bootstrap";
import '../../../app.css';
import NavBar from "../../../components/NavBar/NavBar"
import AdminButtonsSet from "../../../components/AdminPanel/AdminButtonsSet/AdminButtonsSet"
import { RootState } from "../../../store";
import { connect, MapDispatchToProps } from "react-redux";
import { setLogin, setToken, setUsername, setExpiry } from '../../../store/actions/actions';

/**
 * 
 * 
 * @param props - Props from store including isLoggedIn, token, username, date 
 */
const AdminPanel = (props: any) => {
    return (
        <>
        <NavBar isSiteAdmin={true} userUsername={props.username} userToken={props.token} setLogin={props.onSetLogin} setToken={props.setToken}/>
        <Container className={"d-flex justify-content-center align-items-center m-auto h-75"}>
            <AdminButtonsSet />
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
