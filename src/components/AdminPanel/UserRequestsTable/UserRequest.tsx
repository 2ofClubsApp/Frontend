import { Button } from "react-bootstrap";
import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { RootState } from "../../../store";
import { connect } from "react-redux";
import axios from "../../../axios"

library.add(faCheck, faTimes)

type UserRequestDefinition = {
    newUsername: string
    id: number
    newToken: string
    setData: any
}

const UserRequest = (input: UserRequestDefinition) => {

    const activateUser = async (values: any) => {
        return axios({
            method: 'post',
            url: `/toggle/users/${input.newUsername}`,
            headers: {
                Authorization: `Bearer ${input.newToken}`
            },
            }).then((response: any) => {
                console.log(response);
                const fetchData = async () => {
                    const result = await axios({
                        method: 'get',
                        url: `/users/toggle`,
                        headers: {
                            Authorization: `Bearer ${input.newToken}`
                        }
                    })
                    console.log(result.data);
                    input.setData(result.data);
                    };
        
                fetchData();
        }).catch(err => {
            console.log(err + " submission failed");
        });
    };

    return (
        <tr>
            <td colSpan={3} key={input.newUsername}>{input.newUsername}</td>

            <td className={"text-center d-flex justify-content-between"}>
                <Button className="mr-2" onClick={activateUser}><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></Button>
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

export default connect(mapStateToProps)(UserRequest);