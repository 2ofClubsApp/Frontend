import React from 'react'
import {Container, Button} from "react-bootstrap";
import {useHistory} from 'react-router-dom'
import NavBar from "../../components/NavBar/NavBar"
import ResetPasswordForm from '../../components/ResetPassword/ResetPasswordForm';
import {RootState} from "../../store/reducers";
import {connect, MapDispatchToProps} from "react-redux";
import {setLogin, setToken, setUsername, setExpiry} from "../../store/actions/actions";

const ResetPasswordEmail = (props: any) => {
    const history = useHistory();
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };
    
    if (props.isLoggedIn) {
        return (
            <>
            <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token} setLogin={props.onSetLogin} setToken={props.setToken}/>
            <Container className={"d-flex justify-content-center align-items-center mt-5"}>
                <ResetPasswordForm />
            </Container>
            </>
        )
    }
    else {
        return (
            <>
                <Button variant="outline-light" className="m-2 text-uppercase" onClick={() => changeRoute('/')}>Back to
                    Home
                </Button>
                <Container className={"d-flex justify-content-center align-items-center mt-5"}>
                    <ResetPasswordForm />
                </Container>
            </>
        )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordEmail);
