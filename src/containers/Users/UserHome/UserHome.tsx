import React from 'react'
import {Container} from "react-bootstrap";
import '../../../app.css';
import Card from "../../../components/ClubCard/ClubCard";
// import {useHistory} from 'react-router-dom'
import NavBar from "../../../components/NavBar/NavBar"
import { RootState } from '../../../store/reducers';
import { connect, MapDispatchToProps } from 'react-redux';
import {setLogin, setToken, setUsername, setExpiry} from "../../../store/actions/actions";

const Home = (props: any) => {
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
           <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token} setLogin={props.onSetLogin} setToken={props.setToken}/>
            <Container className={"d-flex justify-content-center align-items-center"}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);