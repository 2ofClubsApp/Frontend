import React from 'react'
import { Container } from "react-bootstrap";
import '../app.css';
import Card from "../components/Swipe/Card";
import '../app.css';
import NavBar from "../components/NavBar/NavBar"
import { connect } from 'react-redux';
import { RootState } from '../store';

const Explore = (props: any) => {

    return (
        <>
           <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token}></NavBar>
            <Container className={"d-flex justify-content-center align-items-center mt-5"}>
                <Card />
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
};

export default connect(mapStateToProps)(Explore)
