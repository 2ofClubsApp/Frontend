import React from 'react'
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useHistory} from 'react-router-dom'
import "../app.css"
import { RootState } from '../store/reducers';
import { MapDispatchToProps, connect } from 'react-redux';
import { setLogin, setToken, setUsername, setExpiry } from '../store/actions/actions';


const LandingPage = (props:any) => {
    const history = useHistory();
    
    const changeRoute = (path: string, history: any) => {
        history.push({pathname: path})
    };

    const signup = {
        fontSize: "1.25rem",
        backgroundColor: "white",
        color: "#696DE9",
        padding: "1rem 2rem",
        margin: "10vh 0 0 0",
        borderRadius: "1rem"
    };

    return (
        <Jumbotron fluid bsPrefix="landing">
            <Container fluid>
                <Row>
                    <Col xs>
                        <Button variant="outline-light" className="float-right"
                                style={{margin: "10px", textTransform: "uppercase"}}
                                onClick={() => changeRoute('/login', history)}>
                            Login
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs>
                        <h1 className="landing-title">
                            2ofClubs
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs>
                        <h2 className="landing-subtitle">
                            Find the community for you!
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs className="text-center">
                        <Button style={signup} onClick={() => changeRoute('/signup', history)}>
                            SIGN UP
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username
    }
};

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, null>) => {
    return {
        onSetLogin: (isLogged: boolean) => dispatch(setLogin(isLogged)),
        setToken: (token: string) => dispatch(setToken(token)),
        setUsername: (username: string) => dispatch(setUsername(username)),
        setExpiry: (date: number) => dispatch(setExpiry(date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);