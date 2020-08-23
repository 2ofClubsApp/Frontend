import React from 'react'
import {Container} from "react-bootstrap";
// import {useHistory} from 'react-router-dom'
import NavBar from "../../../components/NavBar/NavBar"
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import jwt_decode from 'jwt-decode';
import UserRequestsTable from '../../../components/AdminPanel/UserRequestsTable/UserRequestsTable';


const UserRequests = (props: any) => {
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

    const decode = () => {
        const decoded = jwt_decode(props.token);
        return decoded;
    }

    decode();

    console.log("user requests " + props.token)
    
    //console.log("manageclubs token:" + props.token);
//<ClubsOverview title={"Your Clubs"} view={true} token={props.token}></ClubsOverview>
    return (
        <>
        <NavBar isSiteAdmin={true} userUsername={props.username} userToken={props.token}></NavBar>
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

export default connect(mapStateToProps)(UserRequests);
