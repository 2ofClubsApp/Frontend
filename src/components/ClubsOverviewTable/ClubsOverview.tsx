import {Button, Container, Row, Col, Table} from "react-bootstrap";
import React from "react";
import "./ClubsOverview.css";
import {Link} from "react-router-dom";
import ClubListing from "./ClubListing";

type ClubsOverviewDefinition = {
    title: string
    view: boolean
}

const ClubsOverview = (props: ClubsOverviewDefinition) => {
    return (

        <Container className={"clubsOverviewContainer"}>
            <h1 className={"title"}>{props.title}</h1>
            <Table responsive hover striped >
                <thead>
                    <tr className={"d-flex"}>
                        <td colSpan={3} className={"col-11"}>
                            <b>Club Name</b>
                        </td>
                        <td className={"col-1"}><b>Manage</b></td>
                    </tr>
                </thead>
                <tbody>

                    <ClubListing title={"Name"} overviewType={props.view}></ClubListing>
                    <ClubListing title={"Name"} overviewType={props.view}></ClubListing>
                    <ClubListing title={"Name"} overviewType={props.view}></ClubListing>
                    <ClubListing title={"Name"} overviewType={props.view}></ClubListing>
                </tbody>
                </Table>
        </Container>
    )
}
export default ClubsOverview