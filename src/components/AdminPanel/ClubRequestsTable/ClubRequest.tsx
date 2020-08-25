import { Button } from "react-bootstrap";
import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { RootState } from "../../../store";
import { connect } from "react-redux";
import axios from "../../../axios"
import styles from "./ClubRequestsTable.module.css"

library.add(faCheck, faTimes)

type ClubRequestDefinition = {
    clubName: string
    clubID: number
    newToken: string
    updateClubs: any
    showPreview: any
    setPreviewClub: any
}

const ClubRequest = (input: ClubRequestDefinition) => {

    const activateClub = async (values: any) => {
        return axios({
            method: 'post',
            url: `/toggle/clubs/${input.clubID}`,
            headers: {
                Authorization: `Bearer ${input.newToken}`
            },
            }).then((response: any) => {
                console.log(response);
                const fetchData = async () => {
                    const result = await axios({
                        method: 'get',
                        url: `/clubs/toggle`,
                        headers: {
                            Authorization: `Bearer ${input.newToken}`
                        }
                    })
                    console.log(result.data);
                    input.updateClubs(result.data.data);
                    };
        
                fetchData();
        }).catch(err => {
            console.log(err + " submission failed");
        });
    };

    return (
        <tr>
            <td colSpan={3} key={input.clubName}><Button className={styles.clubLink} onClick={() => {input.setPreviewClub(input.clubID); input.showPreview();}}>{input.clubName}</Button></td>

            <td className={"text-center"}>
                <Button className="mr-2" onClick={activateClub}><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></Button>
            </td>

        </tr>           
    )

}

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(ClubRequest);