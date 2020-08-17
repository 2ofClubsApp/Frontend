import React, {useState, useEffect} from 'react'
import {ToggleButton, Container, Row, Image, Form, Modal} from "react-bootstrap";
import styles from "./ResetPasswordLink.module.css"
import TagsContainer from "../TagsContainer/TagListing"
import {Formik} from "formik";
import * as yup from "yup";
import axios from "../../axios";
import {resetPasswordSchema} from "../Form/Schemas";
import {FormInfo, passLabel, userLabel} from "../../types/FormInfo";
import Label from "../Form/Label";
import FormContainer from "../Form/FormContainer";
import FormButton from "../Form/FormButton";
import {useHistory, Link} from "react-router-dom";

const ResetPasswordLink = () => {
    const history = useHistory();
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };

    const [state] = React.useState({
        username: "",
        password: "",
    });

    return (
        <div className={styles.passwordLinkDiv}>
            <Link to={"/resetpassword"} className={styles.passwordLink}>Forgot your password?</Link>
        </div>
    )
}

export default ResetPasswordLink;