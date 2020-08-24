import {Form, Modal, Button, Col, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import styles from "./ClubRequestForm.module.css"
import axios from "../../../axios";

type eventFormDefinition = {
    show: any,
    onHide: any,
    userToken: string,
    clubID: number,
    updateClubs: any
}

const ClubRequestForm = (input: eventFormDefinition) => {

    const [club, setClub] = useState({id: -1, name: "", email: "", bio: "", size: 5,tags: [], hosts: []})

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/clubs/${input.clubID}/preview`,
                headers: {
                Authorization: `Bearer ${input.userToken}`
                          }
                        })
            setClub(result.data.data);
            };
        fetchData();
    }, [input.clubID, input.userToken]);

    const activateClub = async () => {
        return axios({
            method: 'post',
            url: `/toggle/clubs/${input.clubID}`,
            headers: {
                Authorization: `Bearer ${input.userToken}`
            },
            }).then((response: any) => {
                console.log(response);
                const fetchData = async () => {
                    const result = await axios({
                        method: 'get',
                        url: `/clubs/toggle`,
                        headers: {
                            Authorization: `Bearer ${input.userToken}`
                        }
                    })
                    console.log(result.data);
                    input.updateClubs(result.data.data);
                    };
        
                fetchData();
        }).catch(err => {
            console.log(err + " submission failed");
        });
    };

    return (
        <Modal show={input.show} onHide={input.onHide} className={styles.EventForm}>
            <Modal.Header closeButton>
            <Modal.Title className={styles.title + " mb-0 ml-5"}>Previewing {club.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.EventFormContent}>

    
            <Form noValidate>
            <Form.Row>
                <Form.Group as={Col} md="6" controlId="clubName">
                    <Form.Label className={styles.subtitle}>Club Name</Form.Label>
                    <Form.Control
                        className={styles.inputBox}
                        type="text"
                        placeholder="Club Name"
                        name="clubName"
                        value={club.name || ''}
                        disabled
                    />
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="clubEmail">
                    <Form.Label className={styles.subtitle}>Club Email</Form.Label>
                    <Form.Control
                        className={styles.inputBox}
                        type="text"
                        placeholder="Club Email"
                        name="clubEmail"
                        value={club.email || ''}
                        disabled
                    />
                </Form.Group>
            </Form.Row>


            <Form.Row>
                <Form.Group as={Col} controlId="bio">
                    <Form.Label className={styles.subtitle}>Bio</Form.Label>
                    <Form.Control
                        className={styles.inputBox}
                        required
                        as="textarea"
                        rows={3}
                        name="bio"
                        value={club.bio || ''}
                        disabled
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="6" controlId="size">
                <Form.Label className={styles.subtitle}>Size of Club</Form.Label>
                <Form.Control
                    className={styles.inputBox}
                    type="text"
                    placeholder="Size"
                    name="size"
                    value={club.size || ''}
                    disabled
                />
                </Form.Group>
            </Form.Row>
            
            
            </Form>

            </Modal.Body>
            <Modal.Footer>
                <Row className="d-flex justify-content-end align-items-center">
                    <Button type="button" className={ styles.btnpurple + " mr-3" } onClick={() => {activateClub(); input.onHide()}}>
                        ACTIVATE CLUB
                    </Button>
                    <Button type="button" className={ styles.btnpurpleoutline } onClick={input.onHide}>
                        CANCEL
                    </Button>
                </Row>
            </Modal.Footer>
            
      </Modal>        
    )
}

export default ClubRequestForm;