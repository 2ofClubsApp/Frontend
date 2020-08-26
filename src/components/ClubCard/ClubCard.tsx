import React from 'react';
import {Button, Row, Card} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faRedo, faHeart, faIdCard, faTimes, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import axios from "../../axios";
import styles from "./ClubCard.module.css";
import "./style.css"
import { Club } from '../../types/DataResponses';
import { useHistory } from 'react-router-dom';

type ClubCardDefinition = {
    username: string
    token: string
    clubObject: Club
    index: number
}

const ClubCard = (input: ClubCardDefinition) => {

    const history = useHistory();

    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };

    const swipeClub = async () => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/users/${input.username}/clubs/${input.clubObject.id}/swipe`,
            headers: {
                Authorization: `Bearer ${input.token}`
            },
            }).then((response: any) => {
                return response.data
        }).catch(err => {
            console.log(err + " failed to submit tag");
        });
    };

    const skipped = () => {
        document.getElementById(`${input.clubObject.name}card`)!.style.display = "none";
    }

    const liked = () => {
        swipeClub().then(()=> {
            document.getElementById(`${input.clubObject.name}card`)!.style.display = "none";
        })
    }

    const style = {
        zIndex: input.index
    }

    let imgURL = `http://localhost:8080${input.clubObject.logo}`

    if (input.clubObject.logo === "") {
        imgURL = "https://www.nicepng.com/png/detail/203-2035848_club-symbol-card-shape-game-playing-shapes-play.png"
    }


    if (input.clubObject.name === "") {
        return (
            <>
            <Card id={`${input.clubObject.name}card`} className={"w-100 h-100 " + styles.try} style={style}>
                <Card.Img variant="top" height="65%" src={`https://images.unsplash.com/photo-1567473030492-533b30c5494c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80`} alt="Image" />
                <Card.Body className={"d-flex justify-content-between align-items-center flex-column"}>
                    <Card.Title className={styles.title + " d-flex justify-content-between align-items-end"}>Already done?
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Come back later for more options!</Card.Subtitle>
                    <Card.Text>
                        Add more tags in your profile to explore more options or look back on ones you skipped before!
                    </Card.Text>
                    <Row className={"d-flex justify-content-center align-items-center mt-2"}>
                        <Button type="button" className={"mx-3 " + styles.clubCardButton} onClick={() => {window.location.reload(false);}}><FontAwesomeIcon icon={faRedo} /></Button>
                        <Button type="button" className={"mx-3 " + styles.clubCardButton} onClick={() => {changeRoute("/settings/user")}}><FontAwesomeIcon icon={faIdCard} /></Button>
                    </Row>
                </Card.Body>
            </Card>
            </>
        )
    }
    else {
        return (
            <>
            <Card id={`${input.clubObject.name}card`} className={"w-100 h-100 " + styles.try} style={style}>
                <Card.Img variant="top" height="65%" src={imgURL} alt="Image" />
                <Card.Body className={"d-flex justify-content-between flex-column"}>
                    <div>
                        <Card.Title className={styles.title + " d-flex justify-content-between align-items-end"}>{input.clubObject.name} 
                            <span className={styles.size + " mb-1"}><FontAwesomeIcon icon={faUserFriends}/> {input.clubObject.size}</span>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{input.clubObject.tags.map((item: any) => {return item.name})}</Card.Subtitle>
                        <Card.Text>
                            {input.clubObject.bio}
                        </Card.Text>
                    </div>
                    
                    <Row className={"d-flex justify-content-center align-items-center mt-2"}>
                        <Button type="button" className={"mx-3 " + styles.clubCardButton} onClick={skipped}><FontAwesomeIcon icon={faTimes} /></Button>
                        <Button type="button" className={"mx-3 " + styles.clubCardButton} onClick={liked}><FontAwesomeIcon icon={faHeart} /></Button>
                    </Row>
                </Card.Body>
            </Card>
            </>
        )
    }
};

export default ClubCard;

