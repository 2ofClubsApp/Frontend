import React from 'react'
import {Container} from "react-bootstrap";
import '../app.css';
import Card from "../components/Swipe/Card";
// import {useHistory} from 'react-router-dom'
import NavBar from "../components/NavBar/NavBar"
import { RootState } from '../store';
import { connect } from 'react-redux';

const Home = () => {
    // const history = useHistory();
    // const changeRoute = (path: string) => {
    //     history.replace({pathname: path})
    // };

    // const [state, setState] = React.useState({
    //     username: "",
    //     password: "",
    // });

    // const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     const value = event.target.value
    //     const id = event.target.id
    //     setState({
    //         ...state,
    //         [id]: value
    //     })
    // }

    return (
        <>
           <NavBar isSiteAdmin={false}></NavBar>
            <Container className={"d-flex justify-content-center align-items-center mt-5"}>
                <Card />
            </Container>
        </> 
    )
}

const mapStateToProps = (state: RootState) => {
    // console.log("islogged in is " + state.system.isLoggedIn);
    // console.log("token is " + state.system.token);
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token
    }
};

export default connect(mapStateToProps, null)(Home);