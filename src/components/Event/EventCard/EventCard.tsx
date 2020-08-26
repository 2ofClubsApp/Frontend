import {Card, Button, Row, Col} from "react-bootstrap";
import React, { useState} from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import styles from "./EventCard.module.css"
import { eventGET } from "../../../types/DataResponses";
import axios from "../../../axios";

library.add(faMapMarkerAlt, faDollarSign);

type EventCardDefinition = {
    eventObject: eventGET;
    token: string;
    isAttending: boolean;
}

const EventCard = (input: EventCardDefinition) => {

    const attendEvent = async () => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/events/${input.eventObject.id}/attend`,
            headers: {
                Authorization: `Bearer ${input.token}`
            },
            }).then((response: any) => {
                return response.data
        }).catch(err => {
            console.log(err + " failed to submit tag");
        });
    };

    const unattendEvent = async () => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/events/${input.eventObject.id}/unattend`,
            headers: {
                Authorization: `Bearer ${input.token}`
            },
            }).then((response: any) => {
                return response.data
        }).catch(err => {
            console.log(err + " failed to submit tag");
        });
    };

    const [show, setShow] = useState(false)


    const showMore = () => {
        setShow(true);
        document.getElementById(`${input.eventObject.name}card`)!.style.backgroundColor = '#f2f3ff';
        document.getElementById(`${input.eventObject.name}card`)!.style.color = '#6367e0';
        // document.getElementById(`${name}button`)!.style.visibility = 'visible';
    }

    const exitShowMore = () => {
        setShow(false);
        document.getElementById(`${input.eventObject.name}card`)!.style.backgroundColor = 'white';
        document.getElementById(`${input.eventObject.name}card`)!.style.color = 'black';
        // document.getElementById(`${name}button`)!.style.visibility = 'hidden';
    }

    const makeTitle = () => {
        return (!show) ? (<Card.Title className="mt-5" style={{fontSize: "3rem"}}>{input.eventObject.name}</Card.Title>) : (<></>);
    }

    const makeButton = () => {
        let buttonText = "";
        buttonText = input.isAttending ? "Remove event" : "Add to attending"
        return (show) ? (input.isAttending ? (<Button id={`${input.eventObject.name}button`} variant="primary" onClick={unattendEvent}>{buttonText}</Button>) : (<Button id={`${input.eventObject.name}button`} variant="primary" onClick={attendEvent}>{buttonText}</Button>)) : (<></>);
    }

    const makeDetails = () => {
        return (!show) ? (
            <Row className="mt-5 w-100" style={{color: '#6367e0'}}> 
                <Col md={6} className={"p-0"}><FontAwesomeIcon icon={faMapMarkerAlt}/> {input.eventObject.location}</Col> 
                <Col md={6} className={"p-0"}><FontAwesomeIcon icon={faDollarSign}/> {input.eventObject.fee.toFixed(2)}</Col> 
            </Row>) : (<></>);
    }

    const makeText = () => {
        return (show) ? (<Card.Text className={"text-center d-flex justify-content-center align-items-center flex-column"}>{input.eventObject.description}</Card.Text>) : (<></>);
    }

    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const date = (new Date(Date.parse(input.eventObject.datetime))).toLocaleDateString(undefined, options);

    const time = (new Date(Date.parse(input.eventObject.datetime))).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});


    return (
        <>
        <Card id={`${input.eventObject.name}card`} style={{ width: '20rem', height: '20rem'}} className={styles.box} onMouseOver={showMore} onMouseLeave={exitShowMore}>
            <Card.Body className={"text-center d-flex justify-content-between align-items-center flex-column"}>
                <div className={"d-flex justify-content-center align-items-center flex-column"}>
                    <b style={{color: '#6367e0'}}>{date + " at " + time}</b>
                </div>
                {makeTitle()}
                {makeText()}
                {makeButton()}
                {makeDetails()}
            </Card.Body>
        </Card>
        </>
    )
}

export default EventCard;