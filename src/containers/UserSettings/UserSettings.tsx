import React, { useState, useEffect } from 'react'
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

    const [data, setData] = useState({ Email: "" });
   
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/users/${props.username}`,
                headers: {
                Authorization: `Bearer ${props.token}`
                          }
                        })
            setData(result.data.Data);
            };

        fetchData();
    }, []);

    console.log(props.token)
    
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

    console.log(data);

    return (
        <>
        <NavBar isSiteAdmin={false}></NavBar>
        <UserSettingsForm title={"Save your profile"} username={props.username} email={data.Email} newToken={props.token}>
            
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
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(UserSettings);
