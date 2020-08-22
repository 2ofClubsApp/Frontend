import {Dropdown} from "react-bootstrap";
import React from "react";
import styles from "../ClubForm/ClubForm.module.css"
import {Link} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faCoffee } from '@fortawesome/free-solid-svg-icons'
import "../NavBar/NavBar"
import { RootState } from "../../store";
import { connect } from "react-redux";

library.add(faCog, faCoffee)

type clubDefinition = {
    title: string
    overviewType: boolean
    active: boolean
    clubID: number
    eventID: number
    deleteCommand: any
}

const EventListing = (input: clubDefinition) => {

    const eventListingDelete = () => {
        input.deleteCommand(input.clubID, input.eventID)
    }

    return (
        <tr className={"d-flex"} key={input.eventID}>
            <td colSpan={3} className={"col-10"} key={input.eventID}>{input.title}</td>

            <td className={"col-2 text-center d-flex justify-content-center align-items-center"}>
                <Dropdown>
                <Dropdown.Toggle className={styles.EventSettingsDropdown} id="dropdown-basic">
                    <FontAwesomeIcon icon={faCog}/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Edit Event</Dropdown.Item>
                    <Dropdown.Item onClick={eventListingDelete}>Delete Event</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </td>

        </tr>           
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(EventListing);