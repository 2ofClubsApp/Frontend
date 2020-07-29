import {Container, Row, Col, Table} from "react-bootstrap";
import React from "react";
import "./ClubsOverview.css";
import ClubListing from "./ClubListing";
import {RootState} from "../../store";
import axios from "../../axios";
import {userInfo} from "os";

type ClubsOverviewDefinition = {
    title: string
    view: boolean
    token: string
}

type StatusResponse = {
    data: {
        Code: number,
        Message: string,
        Data: {
            Manages: Club[]
            Tags: Array<{}>
        }
    }
}

type arrResponse = {
    Name: string
    Email: string
}

type Club = {
    Bio: string
    Email: string
    ID: number
    IsOwner: true
    Name: string
    Size: number
}

type getClubsResult = {
    data: StatusResponse
}


const ClubsOverview = (types: ClubsOverviewDefinition, props: any) => {
    let list: {}  = {}

    const getUserInfo = async (username: string, token: any, arr: Array<any>) => {
        const response = await axios({
            method: 'get', //you can set what request you want to be
            url: `/users/${username}`,
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTYwMDEwOTAsImlhdCI6IjIwMjAtMDctMjlUMDE6MzM6MTAuMzMzODMyLTA0OjAwIiwic3ViIjoiYWRtaW4ifQ.3O8Getoa-BFxvEwqyTSI9dBVC_ldAgJDbvslpt4HTRo`
            }
        });
        return response
    }


    const getClubs = async () => {
        const arr: Array<String> = [];
        await getUserInfo("admin", types.token, arr).then((response: StatusResponse) => {
            // plop Manages array in arr cause it doesn't like being returned directly??
            list = response
        }).catch(err => {
            console.log(err + " unable to retrieve student info");
            return arr;
        });
        // @ts-ignore
        let b = list.data.Data.Manages.map((club: Club, index: number) => {
            return (<ClubListing key={index} active={false} title={club.Name} overviewType={types.view}/>)
        })
        return b
    }
    /* <ClubListing active={false} title={"Name"} overviewType={types.view}></ClubListing>
                    <ClubListing active={false} title={"MCSS"} overviewType={types.view}></ClubListing>
                    <ClubListing active={false} title={"ACS"} overviewType={types.view}></ClubListing>
                    <ClubListing active={true} title={"DSC"} overviewType={types.view}></ClubListing>*/
    // console.log(getUserInfo("admin", types.token, []))
    getClubs()
    return (
        <Container className={"clubsOverviewContainer"}>
            <h1 className={"title"}>{types.title}</h1>
            <Table responsive hover striped>
                <thead>
                <tr className={"d-flex"}>
                    <td colSpan={3} className={"col-11"}>
                        <b>Club Name</b>
                    </td>
                    <td className={"col-1"}><b>Manage</b></td>
                </tr>
                </thead>
                <tbody>
                {list}
                </tbody>
            </Table>
        </Container>
    )
}
export default ClubsOverview
