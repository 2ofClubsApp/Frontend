import React from 'react'
import {Container, Row, Col, Button} from "react-bootstrap";
import ClubsOverview from "../../components/ClubsOverviewTable/ClubsOverview";
import {useHistory} from 'react-router-dom'
import NavBar from "../../components/NavBar/NavBar"
import ClubsAdvancedSettingsForm from "../../components/ClubAdvancedSettings/ClubsAdvancedSettingsForm"

const ManageClubs = () => {
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
        <NavBar isSiteAdmin={false}></NavBar>
        <Container className={"d-flex justify-content-center align-items-center mt-5"}>
            <ClubsAdvancedSettingsForm></ClubsAdvancedSettingsForm>
        </Container>
        </>
    )
}

export default ManageClubs
