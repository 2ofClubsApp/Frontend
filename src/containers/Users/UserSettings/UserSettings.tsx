import React, { useState, useEffect } from 'react'
import UserSettingsForm from '../../../components/User/UserSettingsForm/UserSettingsForm';
import NavBar from "../../../components/NavBar/NavBar"
import axios from "../../../axios";
import { RootState } from '../../../store';
import { connect } from 'react-redux';

const UserSettings = (props: any) => {

    const [data, setData] = useState("");
   
    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: 'get', //you can set what request you want to be
                url: `/users/${props.username}`,
                headers: {
                Authorization: `Bearer ${props.token}`
                          }
                        })
            .then((result: any) => {
                setData(result.data.data.email);
            })
            
            };
        fetchData();
    }, [props.username, props.token]);

    return (
        <>
        <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token}></NavBar>
        <UserSettingsForm title={"Save your profile"} username={props.username} email={data} userToken={props.token} />

        </>
    )
};

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(UserSettings);
