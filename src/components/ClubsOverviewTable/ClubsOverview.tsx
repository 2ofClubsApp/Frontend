import {Container, Table} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import "./ClubsOverview.css";
import ClubListing from "./ClubListing";
import axios from "../../axios";
import { RootState } from "../../store";
import { connect } from "react-redux";

type ClubsOverviewDefinition = {
    newUsername: string;
    newToken: string;
}

function ClubsOverview(input: ClubsOverviewDefinition) {
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
        <Container className={"clubsOverviewContainer"}>
             <h1 className={"title"}>Your Clubs</h1>
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
                     {data.manages.map((item: any) => (
                         <ClubListing key={item.id} id={item.id} active={false} title={item.name} overviewType={true} />
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

export default connect(mapStateToProps)(ClubsOverview);