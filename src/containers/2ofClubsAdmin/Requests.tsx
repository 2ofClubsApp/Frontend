import React from 'react'
import {Container, Row, Col, Button} from "react-bootstrap";
import '../../app.css';
import ClubsOverview from "../../components/ClubsOverviewTable/ClubsOverview";
import {useHistory} from 'react-router-dom'
import NavBar from "../../components/NavBar/NavBar"

const Requests = () => {
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

    return (
        <>
        <NavBar isSiteAdmin={true}></NavBar>
        <Container className={"d-flex justify-content-center align-items-center mt-5"}>
            <ClubsOverview title={"Incoming Requests"} view={false}></ClubsOverview>
        </Container>
        </>
    )
}

export default Requests
