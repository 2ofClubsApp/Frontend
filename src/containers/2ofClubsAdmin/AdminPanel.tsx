import React from 'react'
import {Container} from "react-bootstrap";
import '../../app.css';
import {useHistory} from 'react-router-dom'
import NavBar from "../../components/NavBar/NavBar"
import AdminButtonsSet from "../../components/AdminButtonsSet"

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
        <NavBar isSiteAdmin={true}></NavBar>
        <Container className={"d-flex justify-content-center align-items-center m-auto h-75"}>
            <AdminButtonsSet></AdminButtonsSet>
        </Container>
        </>
    )
}

export default AdminPanel
