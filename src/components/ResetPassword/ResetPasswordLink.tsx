import React from 'react'
import styles from "./ResetPasswordLink.module.css"
import {Link} from "react-router-dom";

const ResetPasswordLink = () => {

    return (
        <div className={styles.passwordLinkDiv}>
            <Link to={"/emailreset"} className={styles.passwordLink}>Forgot your password?</Link>
        </div>
    )
}

export default ResetPasswordLink;