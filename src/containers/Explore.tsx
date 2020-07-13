import React from 'react'
import {Container, Row, Col, Button} from "react-bootstrap";
import '../app.css';
import Card from "../components/Swipe/Card";
import {useHistory} from 'react-router-dom'
import '../app.css';

const Explore = () => {
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
        <Button variant="outline-light" className="m-2 text-uppercase" onClick={() => changeRoute('/')}>Back to
                Home
        </Button>
        <Container className={"d-flex justify-content-center align-items-center mt-5"}>
            <Card />
        </Container>
        </>
    )
}

export default Explore
