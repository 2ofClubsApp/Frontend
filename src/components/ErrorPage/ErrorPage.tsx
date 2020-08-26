import React from 'react'
import {Container, Button} from "react-bootstrap";
import {useHistory} from 'react-router-dom'
import {RootState} from "../../store/reducers";
import {connect} from "react-redux";
import styles from "./ErrorPage.module.css"

const ErrorPage = (props: any) => {
    const history = useHistory();
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };
    
    return (
        <>
        <Container className={"text-center w-100 h-75 d-flex flex-column justify-content-center align-items-center " + styles.errorContainer}>
            <h1 className={styles.title}>Oops :(</h1>
            <hr className={styles.white}></hr>
            <h2 className={styles.subtitle}>This page doesn't exist or is awaiting approval.</h2>
            <h2 className={styles.subtitle}>Check back later!</h2>
            <Button variant="outline-light" onClick={() => changeRoute("/")} className={"mt-3"}>BACK TO HOME</Button>
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

export default connect(mapStateToProps)(ErrorPage);
