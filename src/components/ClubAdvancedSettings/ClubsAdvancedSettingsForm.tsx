import React from 'react'
import {ToggleButton, Container, Row, Image, Form, Table} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./ClubsAdvancedSettings.module.css";
import ClubAdminsListing from "./ClubAdminsListing";

type advancedSettingsDefinition = {
}

const ClubsAdvancedSettingsForm = (form: advancedSettingsDefinition) => {

    return (

        <Container className={styles.container}>
            <Form>
                <Row>
                    <Col>
                        <Form.Label className={styles.subtitle}>Invite Users as Admins</Form.Label>
                        <Form.Row className="d-flex justify-content-center">
                            <Col sm={12} md={12} lg={5} className="d-flex justify-content-center align-items-center m-2">
                                <Form.Control placeholder="Username" className={"mr-3 w-75"}/>
                                <Button variant="primary" type="submit">Invite</Button>
                            </Col>
                        </Form.Row>

                        <Form.Label className={styles.subtitle}>Existing Users</Form.Label>
                        <Table responsive >
                        <thead>
                            <tr className={"d-flex"}>
                                <td colSpan={3} className={"col-11"}>
                                    <b>Username</b>
                                </td>
                                <td className={"col-1"}><b>Manage</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            <ClubAdminsListing active={false} title={"JohnSmith"}></ClubAdminsListing>
                        </tbody>
                        </Table>
                    </Col>
                </Row>
            </Form>
        </Container>

        )
};

export default ClubsAdvancedSettingsForm;
