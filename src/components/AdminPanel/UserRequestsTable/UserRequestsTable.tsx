import React, {useState, useEffect} from "react";
import { Container, Table } from "react-bootstrap";
import UserRequest from "./UserRequest";
import axios from "../../../axios";

type UserRequestsTableDefinition = {

    newUsername: string;
    newToken: string;

}

function UserRequestsTable(input: UserRequestsTableDefinition) {

    const [data, setData] = useState({ data: [{id: -1, username: ""}] });
   
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/users/toggle`,
                headers: {
                    Authorization: `Bearer ${input.newToken}`
                }
            })
            console.log(result.data);
            setData(result.data);
            };

        fetchData();
    }, [input.newToken]);
   
    return (
        <Container className={"clubsOverviewContainer"}>
             <h1 className={"title"}>Users Awaiting Approval</h1>
             <Table responsive hover striped>
                 <thead>
                 <tr>
                     <td colSpan={3} className={"col-10"}>
                         <b>Username</b>
                     </td>
                     <td className={"col-2"}><b>Approve</b></td>
                 </tr>
                 </thead>
                 <tbody>
                    {data.data.map((item: any) => (
                            <UserRequest key={item.username} id={item.id} newUsername={item.username} newToken={input.newToken} setData={setData}/>
                        ))}
                 </tbody>
             </Table>
         </Container>
    );

}

export default (UserRequestsTable);