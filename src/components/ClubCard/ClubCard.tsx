import React, {useState, Component} from 'react';
import data from "./testdata";
import {Button, Col, Row, Card} from "react-bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import axios from "../../axios";
import styles from "./ClubCard.module.css";

import "./style.css"


type values = {
    i: number,
    x: number,
    y: number,
    scale: number,
    trans: any,
    bind: any,
}

type info = {
    name: string,
    tags: any[]
    text: string,
    socialMedia: any[],
    pics: any[]
}

type state = {
    count: number,
    info: any,
    render: boolean
}

type ClubCardDefinition = {

}

const ClubCard = (input: ClubCardDefinition) => {

    // const changePassword = async (values: any) => {
    //     return axios({
    //         method: 'post', //you can set what request you want to be
    //         url: `/changePassword/users/${input.username}`,
    //         headers: {
    //             Authorization: `Bearer ${input.userToken}`
    //         },
    //         data: {
    //             "oldPassword": values.password,
    //             "newPassword": values.newPassword
    //         }
    //         }).then((response: StatusResponse) => {
    //             console.log(JSON.stringify(response.data.Message));
    //             return (response.data)
    //     }).catch(err => {
    //         console.log(err + " submission failed");
    //     });
    // };
    
    // const [data, setData] = useState([{id: -1, name: "N/A", isActive: true}]);
    // const [userData, setUserData] = useState(["None"]);
    // const [saved, setSaved] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await axios({
    //             method: 'get', //you can set what request you want to be
    //             url: `/tags/active`})
    //         .then ( (result: any) => {
    //             setData(result.data.data);
    //             }
    //         )
    //     };

    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios({
    //             method: 'get', //you can set what request you want to be
    //             url: `/users/${input.username}`,
    //             headers: {
    //                 Authorization: `Bearer ${input.userToken}`
    //             },
    //         })
    //         const tagsArray = result.data.data.tags;
    //         if (tagsArray !== []){
    //             const tagNamesArray = tagsArray.map((item: tag) => item.name);
    //             setUserData(tagNamesArray);
    //         }
    //         else{
    //             return ["None"]
    //         }
            
    //     };
    //     fetchData();
    // }, [input.userToken, input.username]);

    const skipped = () => {
        console.log("skipp")
    }

    const liked = () => {
        console.log("like")
    }

    const showMoreInfo = () => {
        console.log("info")
    }

    return (
            <>
            <Card className={"w-50 h-75"}>
                <Card.Img variant="top" height="50%" src="https://vettedpetcare.com/vetted-blog/wp-content/uploads/2017/09/How-To-Travel-With-a-Super-Anxious-Cat-square.jpeg" alt="Image" />
                <Card.Body>
                    <Card.Title className={styles.title + " d-flex justify-content-between align-items-end"}>MCSS 
                        <span className={styles.size + " mb-1"}><FontAwesomeIcon icon={faUserFriends}/> 5</span>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Computer Science, Computer Science,Computer Science, + more</Card.Subtitle>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.
                    </Card.Text>
                    <Row className={"d-flex justify-content-center align-items-center mt-2"}>
                        <Button className={"mx-3 " + styles.clubCardButton} onClick={skipped}>X</Button>
                        <Button className={"mx-3 " + styles.clubCardButton} onClick={showMoreInfo}>i</Button>
                        <Button className={"mx-3 " + styles.clubCardButton} onClick={liked}>♥</Button>
                    </Row>
                </Card.Body>
            </Card>
            </>
    )
};

export default ClubCard;

