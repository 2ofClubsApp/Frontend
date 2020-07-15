import {Button, Container, Row, Col, Table} from "react-bootstrap";
import React from "react";
import "./ClubsOverview.css";
import {Link} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faCoffee } from '@fortawesome/free-solid-svg-icons'
import "../NavBar/NavBar"

library.add(faCog, faCoffee)

type clubDefinition = {
    title: string
    overviewType: boolean
}

const ClubListing = (club: clubDefinition) => {
    if (club.overviewType) {
        return (
            <tr className={"d-flex"}>
            <td colSpan={3} className={"col-11"}><Link to="/settings/info">{club.title}</Link></td>

            <td className={"col-1 text-center"}><Link to="/settings/info"><FontAwesomeIcon icon={faCog}/></Link></td>

            </tr>           
        )
    }
    else {
        return (
            <tr className={"d-flex"}>
                <td colSpan={3} className={"col-10"}><Link to="/settings/info">{club.title}</Link></td>
                <td className={"col-1 text-center"}><Button variant="success">Accept</Button></td>
                <td className={"col-1 text-center"}><Button variant="outline-danger">Decline</Button></td>
            </tr>             
        )
    }
}

export default ClubListing