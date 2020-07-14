import {Button, Container, Row, Col, Table} from "react-bootstrap";
import React from "react";
import "./ClubsOverview.css";
import {Link} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import "../NavBar/NavBar"

library.add(faCog)

type clubDefinition = {
    title: string
}

const ClubListing = (club: clubDefinition) => {
    return (
        <tr className={"d-flex"}>
        <td colSpan={3} className={"col-11"}><Link to="/settings/info">{club.title}</Link></td>
        <td className={"col-1 text-center"}><Link to="/settings/info"><FontAwesomeIcon icon={faCog}/></Link></td>
        </tr>
                  
    )
}
export default ClubListing