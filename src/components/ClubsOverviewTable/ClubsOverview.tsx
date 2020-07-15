import {Button, Container, Row, Col, Table} from "react-bootstrap";
import React from "react";
import "./ClubsOverview.css";
import {Link} from "react-router-dom";
import ClubListing from "./ClubListing";

type arrays = {
    elements: string[]
    items: string[]
}

const elements = ["MCSS", "ACS", "DSC", "WiSc"] 

const ClubsOverview = () => {
    return (

        <Container className={"clubsOverviewContainer"}>
            <h1 className={"title"}>Your Clubs</h1>
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
                    {elements.map((value, index) => {
                        return <ClubListing title={value}></ClubListing>
                    })}
                </tbody>
                </Table>
        </Container>
    )
}
export default ClubsOverview