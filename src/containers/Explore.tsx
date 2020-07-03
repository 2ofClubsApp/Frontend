import React from 'react'
import Button from "react-bootstrap/Button";
import Label from "../components/Form/Label";
import {emailLabel, FormInfo, passConfirmLabel, passLabel, userLabel} from "../types/FormInfo";
import {useHistory} from 'react-router-dom'
import '../app.css';
import { useSwipeable, Swipeable } from 'react-swipeable'


const Explore = () => {
    const history = useHistory();
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };

    return (
        <div>
            
        </div>
    )
};

export default Explore
