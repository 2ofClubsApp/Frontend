import React from 'react'
import styles from "./ResetPasswordLink.module.css"
//import {useHistory, Link} from "react-router-dom";
import {Link} from "react-router-dom";

const ResetPasswordLink = () => {
    // const history = useHistory();
    // const changeRoute = (path: string) => {
    //     history.replace({pathname: path})
    // };

    return (
        <div className={styles.passwordLinkDiv}>
            <Link to={"/resetpassword"} className={styles.passwordLink}>Forgot your password?</Link>
        </div>
    )
}

export default ResetPasswordLink;