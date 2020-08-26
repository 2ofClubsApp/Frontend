import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import styles from "./FavouritedClubListing.module.css"
import { Button } from "react-bootstrap";
import axios from "../../../axios";

type clubListingDefinition = {
    username: string
    token: string
    clubname: string
    clubID: number
    setData: any

}

const ClubListing = (input: clubListingDefinition) => {

    const swipeClub = async () => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/users/${input.username}/clubs/${input.clubID}/unswipe`,
            headers: {
                Authorization: `Bearer ${input.token}`
            },
        }).then((response: any) => {
            const fetchData = async () => {
                const result = await axios({
                    method: 'get', //you can set what request you want to be
                    url: `/users/${input.username}/clubs/swipe`,
                    headers: {
                        Authorization: `Bearer ${input.token}`
                    }
                })
                input.setData(result.data.data);
            };
            fetchData();
            return response.data
        }).catch(err => {
            console.log(err + " failed to submit tag");
        });
    };

    return (
        <tr>
            <td colSpan={3} className={"col-11"} key={input.clubID}><NavLink to={`/explore/events/${input.clubID}`} className={styles.clubLink}>{input.clubname}</NavLink></td>
            <td className={"col-1 text-center"}><Button variant="outline-danger" onClick={() => { swipeClub() }}><FontAwesomeIcon icon={faHeartBroken} /></Button></td>
        </tr>
    )
}


export default ClubListing;