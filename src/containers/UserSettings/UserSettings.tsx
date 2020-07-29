import React from 'react'
import UserSettingsForm from '../../components/UserSettingsForm/UserSettingsForm';
import NavBar from "../../components/NavBar/NavBar"
import {useHistory} from 'react-router-dom'
import axios from "../../axios";
import { RootState } from '../../store';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';

const UserSettings = (props: any) => {
    const history = useHistory();
    
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };
    
    // const getUserInfo = (state: RootState) => {
    //     return axios({
    //         method: 'get', //you can set what request you want to be
    //         url: `/users/cat`,
    //         headers: {
    //           Authorization: `Bearer ${state.system.token}`
    //         }
    //       }).then(response => {
    //         console.log(response.data);
    //         console.log(state.system.token);
    //         return response.data;
    //     }).catch(err => {
    //         console.log(err + " unable to retrieve student info");
    //     });
    // }

    console.log("props.token is " + props.token);

    return (
        <>
        <NavBar isSiteAdmin={false}></NavBar>
        <UserSettingsForm title={"Save your profile"} username={props.token} email={props.token}>
            
        </UserSettingsForm>
        </>
    )
};

// const decode = (state: RootState) => {
//     var token = state.system.token;
 
//     var decoded = jwt_decode(token);
//     console.log(decoded);
// }

const mapStateToProps = (state: RootState) => {
    const token = state.system.token;
    console.log("token in usersettings is" + token);
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token
    }
}

export default connect(mapStateToProps)(UserSettings);
