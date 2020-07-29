import {Container, Row, Col, Table} from "react-bootstrap";
import React from "react";
import "./ClubsOverview.css";
import ClubListing from "./ClubListing";
import { RootState } from "../../store";
import axios from "../../axios";

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
            Tags: Array<{

            }>
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
    
    const getUserInfo = async (username: string, token: any, arr: Array<any>) => {
        return axios({
            method: 'get', //you can set what request you want to be
            url: `/users/${username}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
          }).then((response: StatusResponse) => {
            console.log("response.data is" + response.data);
            // plop Manages array in arr cause it doesn't like being returned directly??
            arr.push(response.data.Data.Manages)
            return response;
        }).catch(err => {
            console.log(err + " unable to retrieve student info");
        });
    }
    

    const getClubs = () => {
        const arr: Array<String> = [];
        const userinfo = getUserInfo("cat", types.token, arr).then((result: any) => {
          return result.data.data.Data.Manages.map((club: Club, index: number) => {
              return (<ClubListing key={index} active={false} title={club.Name} overviewType={types.view}></ClubListing>)
          })
        })

        console.log("userinfo is" + userinfo);
        return <h1>hi</h1>
    }

    /* <ClubListing active={false} title={"Name"} overviewType={types.view}></ClubListing>
                    <ClubListing active={false} title={"MCSS"} overviewType={types.view}></ClubListing>
                    <ClubListing active={false} title={"ACS"} overviewType={types.view}></ClubListing>
                    <ClubListing active={true} title={"DSC"} overviewType={types.view}></ClubListing>*/

    return (

        <Container className={"clubsOverviewContainer"}>
            <h1 className={"title"}>{types.title}</h1>
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
                   {getClubs()}
                </tbody>
                </Table>
        </Container>
    )
}
export default ClubsOverview