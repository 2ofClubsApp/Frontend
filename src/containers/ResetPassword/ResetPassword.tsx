import React from 'react'
import {Container, Button} from "react-bootstrap";
import {useHistory} from 'react-router-dom'
import NavBar from "../../components/NavBar/NavBar"
import ResetPasswordForm from '../../components/ResetPassword/ResetPasswordForm';
import {RootState} from "../../store";
import {connect} from "react-redux";

const ResetPassword = (props: any) => {
    const history = useHistory();
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };
    
    console.log(props.isLoggedIn);
    if (props.isLoggedIn) {
        return (
            <>
            <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token}></NavBar>
            <Container className={"d-flex justify-content-center align-items-center mt-5"}>
                <ResetPasswordForm></ResetPasswordForm>
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
                    <ResetPasswordForm></ResetPasswordForm>
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

export default connect(mapStateToProps)(ResetPassword);
