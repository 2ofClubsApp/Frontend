import {Container, Table} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import "./ClubsOverview.css";
import ClubListing from "./ClubListing";
import axios from "../../axios";

type ClubsOverviewDefinition = {
    username: string
    newToken: any
}

function ClubsOverview(type: ClubsOverviewDefinition) {
    const [data, setData] = useState({ Manages: [] });
   
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/users/${type.username}`,
                headers: {
                Authorization: `Bearer ${type.newToken}`
                          }
                        })
            setData(result.data.Data);
            };

        fetchData();
    }, []);
   
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
                         <ClubListing key={item.ID} active={false} title={item.Name} overviewType={true} />
                     ))}
                 </tbody>
             </Table>
         </Container>
    );
  }

export default ClubsOverview;