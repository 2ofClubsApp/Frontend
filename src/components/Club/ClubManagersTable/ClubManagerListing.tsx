import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCrown } from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";


type ClubManagerListingDefinition = {
    clubID: number,
    username: string,
    userToken: string,
    setManagerUsername: any,
    confirmDeletionPopup: any,
    confirmPromotePopup: any,
    isOwner: boolean
}

const ClubManagerListing = (input: ClubManagerListingDefinition) => {

    let btnVariant: "outline-warning" | "outline-secondary" | "primary" | "secondary" | "success" | "danger" = "primary";
    let disabled = true;

    if (input.isOwner) {
        btnVariant = "outline-warning";
        disabled = false;
    }
    else {
        btnVariant = "secondary";
        disabled = true;
    }

    return (
        <tr>
            <td colSpan={3} className={"col-10"}><Link to="/settings/info">{input.username}</Link></td>
            <td className={"col-1 text-center"}>
                <Button variant={btnVariant} disabled={disabled} onClick={ () => {input.setManagerUsername(input.username); input.confirmPromotePopup(); }}><FontAwesomeIcon icon={faCrown}/></Button>
            </td>
            <td className={"col-1 text-center"}>
                <Button variant="outline-danger" onClick={ () => {input.setManagerUsername(input.username); input.confirmDeletionPopup(); }}><FontAwesomeIcon icon={faTrashAlt}/></Button>
            </td>
        </tr>             
    )

}

export default ClubManagerListing;