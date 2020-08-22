import React from 'react'
import {Container, Row, Col, Button} from "react-bootstrap";
import '../../app.css';
import ClubListingTable from "../../components/ClubsOverviewTable/ClubListingTable";
import {useHistory} from 'react-router-dom'
import NavBar from "../../components/NavBar/NavBar"
import { RootState } from '../../store';
import { connect } from 'react-redux';

const ClubRequests = (props:any) => {
    const history = useHistory();
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };

    const [state, setState] = React.useState({
        username: "",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value
        const id = event.target.id
        setState({
            ...state,
            [id]: value
        })
    }
    
//<ClubsOverview title={"Incoming Requests"} view={false} token={props.token}></ClubsOverview>
    return (
        <>
        <NavBar isSiteAdmin={true} userUsername={props.username} userToken={props.token}></NavBar>
        <Container className={"d-flex justify-content-center align-items-center mt-5"}>
            <ClubListingTable newUsername={props.username} newToken={props.token} />
        </Container>
        </>
    )
}


const mapStateToProps = (state: RootState) => {
    const token = state.system.token;
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(ClubRequests);
