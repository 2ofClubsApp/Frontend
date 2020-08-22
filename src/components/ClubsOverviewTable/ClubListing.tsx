import {Form} from "react-bootstrap";
import React from "react";
import "./ClubsOverview.css";
import {Link, NavLink} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { RootState } from "../../store";
import { connect } from "react-redux";
import styles from "./ClubListing.module.css"

library.add(faCog, faCoffee)

type clubListingDefinition = {
    title: string
    overviewType: boolean
    active: boolean
    id: number
}

const ClubListing = (club: clubListingDefinition) => {

    if (club.overviewType) {
        return (
            <tr className={"d-flex"}>
            <td colSpan={3} className={"col-11"} key={club.id}><NavLink to={`/settings/info/${club.id}`} className={styles.clubLink}>{club.title}</NavLink></td>

            <td className={"col-1 text-center"}><NavLink to={`/manageclubs/advancedsettings/${club.id}`} className={styles.clubLink}><FontAwesomeIcon icon={faCog}/></NavLink></td>

            </tr>           
        )
    }
    else {
        if (club.active) {
            return (
                <tr className={"d-flex"}>
                    <td colSpan={3} className={"col-11"}><NavLink to="/settings/info">{club.title}</NavLink></td>
                    <td className={"col-1 text-center"}><Form.Check type={"switch"} id={club.title} label={""} defaultChecked={true} /></td>
                </tr>             
            )
        }
        else {
            return (
                <tr className={"d-flex"}>
                    <td colSpan={3} className={"col-11"}><Link to="/admin/application">{club.title}</Link></td>
                    <td className={"col-1 text-center"}><Form.Check type={"switch"} id={club.title} label={""}/></td>
                </tr>             
            )
        }
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(ClubListing);