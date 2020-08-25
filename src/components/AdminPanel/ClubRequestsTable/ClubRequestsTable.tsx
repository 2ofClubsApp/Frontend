import React, {useState, useEffect} from "react";
import { Container, Table, Row } from "react-bootstrap";
import axios from "../../../axios";
import ClubRequest from "./ClubRequest";
import ClubRequestForm from "./ClubRequestForm";
import styles from "./ClubRequestsTable.module.css"

type ClubListingsTableOverviewDefinition = {
    newUsername: string;
    newToken: string;
}

const ClubListingTable = (input: ClubListingsTableOverviewDefinition) => {

    const [previewClub, setPreviewClub] = useState(-1);

    const [showPreview, setShowPreview] = useState(false);

    const handleClosePreview = () => setShowPreview(false);
    
    const handleShowPreview = () => setShowPreview(true);

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
        <>
        <ClubRequestForm show={showPreview} onHide={handleClosePreview} userToken={input.newToken} clubID={previewClub} updateClubs={setClubs}/>

        <Container className={styles.container}>
            <Row className={"d-flex justify-content-between align-items-end ml-2 mr-2 mt-5 mb-3 row"}>
                <h1 className={styles.title + " m-0"}>Clubs Awaiting Approval</h1>
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
                        <ClubRequest key={item.id} clubID={item.id} clubName={item.name} updateClubs={setClubs} newToken={input.newToken} showPreview={handleShowPreview} setPreviewClub={setPreviewClub}/>
                    ))}
                </tbody>
            </Table>
         </Container>
        </>
    );
}


export default ClubListingTable;