import {Container, Table, Row, Button} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import axios from "../../../axios";
import { RootState } from "../../../store";
import { connect } from "react-redux";
import ClubRequest from "./ClubRequest";

type ClubListingsTableOverviewDefinition = {
    newUsername: string;
    newToken: string;
}

function ClubListingTable(input: ClubListingsTableOverviewDefinition) {
    const [clubs, setClubs] = useState([{ id: -1, name: ""}]);
   
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/clubs/toggle`,
                headers: {
                Authorization: `Bearer ${input.newToken}`
                          }
                        })
            setClubs(result.data.data);
            };
        fetchData();
    }, [input.newToken]);

   
    return (
        <Container className={"clubsOverviewContainer"}>
            <Row className={"d-flex justify-content-between align-items-end ml-2 mr-2 mt-5 mb-3 row"}>
                <h1 className={"title m-0"}>Clubs Awaiting Approval</h1>
            </Row>
             
            <Table responsive hover striped>
                <thead>
                <tr>
                    <td colSpan={3} className={"col-11"}>
                        <b>Club Name</b>
                    </td>
                    <td className={"col-1"}><b>Manage</b></td>
                </tr>
                </thead>
                <tbody>
                    {clubs.map((item: any) => (
                        <ClubRequest key={item.id} clubID={item.id} clubName={item.name} setData={setClubs} newToken={input.newToken}/>
                    ))}
                </tbody>
            </Table>
         </Container>
    );
  }

  const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(ClubListingTable);