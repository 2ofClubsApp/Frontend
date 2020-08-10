import {Container, Table} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import "./ClubsOverview.css";
import ClubListing from "./ClubListing";
import axios from "../../axios";
import { RootState } from "../../store";
import { connect } from "react-redux";

type ClubsOverviewDefinition = {
    newUsername: string
    newToken: any
}

function ClubsOverview(type: ClubsOverviewDefinition) {
    const [data, setData] = useState({ Manages: [] });
   
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/users/${type.newUsername}/manages`,
                headers: {
                Authorization: `Bearer ${type.newToken}`
                          }
                        })
            setData(result.data.Data);
            };

        fetchData();
    }, []);

    console.log(data.Manages)
   
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
                     {data.Manages.map((item: any) => (
                         <ClubListing key={item.ID} id={item.ID} active={false} title={item.Name} overviewType={true} />
                     ))}
                 </tbody>
             </Table>
         </Container>
    );
  }

  const mapStateToProps = (state: RootState) => {
    const token = state.system.token;
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(ClubsOverview);