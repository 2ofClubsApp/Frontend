import React from 'react'
import {Container, Row, Col, Button} from "react-bootstrap";
import '../../app.css';
import ClubsOverview from "../../components/ClubsOverviewTable/ClubsOverview";
import {useHistory} from 'react-router-dom'
import NavBar from "../../components/NavBar/NavBar"

const Requests = (props:any) => {
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
        <NavBar isSiteAdmin={true}></NavBar>
        <Container className={"d-flex justify-content-center align-items-center mt-5"}>
            
        </Container>
        </>
    )
}

export default Requests
