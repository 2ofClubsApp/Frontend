import {Container, Table, Row, Button} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import styles from "./ClubListingsTable.module.css"
import ClubListing from "./ClubListing";
import axios from "../../../axios";
import { RootState } from "../../../store";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

type ClubListingsTableOverviewDefinition = {
    newUsername: string;
    newToken: string;
}

function ClubListingTable(input: ClubListingsTableOverviewDefinition) {
    const history = useHistory();
        const changeRoute = (path: string) => {
            history.replace({pathname: path})
        };

    const [data, setData] = useState({ manages: [] });
   
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/users/${input.newUsername}/manages`,
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
                <h1 className={"m-0 " + styles.title}>Your Clubs</h1>
                <Button className={"h-50 " + styles.btnpurple} onClick={() => changeRoute("/club/create")}>Create a Club</Button>
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
                    {data.manages.map((item: any) => (
                        <ClubListing key={item.id} id={item.id} active={false} title={item.name} />
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