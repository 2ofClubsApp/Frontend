import React from 'react'
import Button from "react-bootstrap/Button";
import Label from "../components/Form/Label";
import Form from "../components/Form/Form";
import {userLabel, emailLabel, passLabel, passConfirmLabel} from "../types/FormInfo";
import {SignUpLabel} from "../types/User";
import {useHistory} from 'react-router-dom';
import '../app.css';
import axios from "../axios"
import {setLogin} from "../store/actions/actions";
import {connect} from "react-redux";


const SignUp = () => {
    const history = useHistory();
    const redirect = (path: string) => {
        history.replace({pathname: path})
    };

    const [state, setState] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value
        const id = event.target.id
        setState({
            ...state,
            [id]: value
        })
    }

    const labels = [userLabel, emailLabel, passLabel, passConfirmLabel];
    const formLabels = labels.map((label, index) => {
        return (
            <Label key={index} info={label} onChange={handleChange}/>
        )
    });

    const signup = () => {
        axios.post("/signup", JSON.stringify({
            "Username": state["username"],
            "Password": state["password"],
            "Email": state["email"],
        })).then(response => {
            console.log(response);
            redirect("/login");
            const login = setLogin(true)
        }).catch(err => {
            console.log(err + "Unable to get student ;.;");
        })
    };

    return (
        <div>
            <Button variant="outline-light" className="m-2 text-uppercase" onClick={() => redirect('/')}>Back to
                Home
            </Button>
            <Form formSubmit={signup} buttonName={SignUpLabel} labels={formLabels} title={SignUpLabel}/>
        </div>
    )
};


export default connect(null, {setLogin})(SignUp)
