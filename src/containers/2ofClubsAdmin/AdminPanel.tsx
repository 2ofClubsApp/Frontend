import React from 'react'
import {Container} from "react-bootstrap";
import '../../app.css';
//import {useHistory} from 'react-router-dom'
import NavBar from "../../components/NavBar/NavBar"
import AdminButtonsSet from "../../components/AdminPanel/AdminButtonsSet"

const AdminPanel = () => {
    // const history = useHistory();
    
    // const changeRoute = (path: string) => {
    //     history.replace({pathname: path})
    // };


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
