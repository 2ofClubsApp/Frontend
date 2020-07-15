import React from 'react'
import {Container, Row, Col, Button, Card} from "react-bootstrap";
import '../../app.css';
import ClubsOverview from "../../components/ClubsOverviewTable/ClubsOverview";
import {useHistory} from 'react-router-dom'
import NavBar from "../../components/NavBar/NavBar"
import AdminButton from "../../components/AdminButton"

const AdminPanel = () => {
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
        <NavBar></NavBar>
        <Container>
            <AdminButton></AdminButton>
        </Container>
        </>
    )
}

export default AdminPanel
