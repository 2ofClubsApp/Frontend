import {Button, Container, Row, Col, Table} from "react-bootstrap";
import React from "react";
import "./ClubsOverview.css";

const ClubsOverview = () => {
    return (
        <Container fluid>
            <h1 className={"title"}>Your Clubs</h1>
            <Table striped responsive hover className={"clubsOverviewContainer"}>
                <tbody>
                    <tr className={"d-flex"}>
                    <td colSpan={3} className={"col-11"}>Club Name</td>
                    <td className={"col-1"}>Settings</td>
                    </tr>
                    <tr className={"d-flex"}>
                    <td colSpan={3} className={"col-11"}>Club Name</td>
                    <td className={"col-1"}>Settings</td>
                    </tr>
                    <tr className={"d-flex"}>
                    <td colSpan={3} className={"col-11"}>Club Name</td>
                    <td className={"col-1"}>Settings</td>
                    </tr>
                </tbody>
                </Table>
        </Container>
    )
}
export default ClubsOverview