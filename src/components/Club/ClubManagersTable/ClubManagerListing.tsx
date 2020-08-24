import React from "react";
import {Link} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";

library.add(faTrashAlt)

type ClubManagerListingDefinition = {
    clubID: number
    username: string
    userToken: string
    setManagerUsername: any
    confirmPopup: any
}

const ClubManagerListing = (input: ClubManagerListingDefinition) => {

    return (
        <tr>
            <td colSpan={3} className={"col-11"}><Link to="/settings/info">{input.username}</Link></td>
            <td className={"col-1 text-center"}><Button variant="outline-danger" onClick={ () => {input.setManagerUsername(input.username); input.confirmPopup(); }}><FontAwesomeIcon icon={faTrashAlt}/></Button></td>
        </tr>             
    )

}

export default ClubManagerListing;