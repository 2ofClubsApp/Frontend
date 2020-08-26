import {Container, Table, Row} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import styles from "./FavouritedClubsTable.module.css"
import FavouritedClubListing from "./FavouritedClubListing";
import axios from "../../../axios";

type FavouritedClubsTableOverviewDefinition = {
    newUsername: string;
    newToken: string;
}

function FavouritedClubListingTable(input: FavouritedClubsTableOverviewDefinition) {
    const [data, setData] = useState([{id: -1, name: ""}]);
   
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/users/${input.newUsername}/clubs/swipe`,
                headers: {
                Authorization: `Bearer ${input.newToken}`
                          }
                        })
            setData(result.data.data);
            };
        fetchData();
    }, [input.newUsername, input.newToken]);

   
    return (
        <Container className={styles.clubListingsTable}>
            <Row className={"d-flex justify-content-between align-items-end m-2 mt-5 row"}>
                <h1 className={"m-0 " + styles.title}>Clubs you Liked</h1>
            </Row>
             
            <Table responsive hover striped>
                <thead>
                <tr>
                    <td colSpan={3} className={"col-11"}>
                        <b>Club Name</b>
                    </td>
                    <td className={"col-1"}><b>Unfavourite</b></td>
                </tr>
                </thead>
                <tbody>
                    {data.map((item: any) => (
                        <FavouritedClubListing key={item.id} clubID={item.id} clubname={item.name} username={input.newUsername} token={input.newToken} setData={setData}/>
                    ))}
                </tbody>
            </Table>
         </Container>
    );
  }

export default FavouritedClubListingTable;