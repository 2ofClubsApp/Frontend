import React, {useEffect, useState} from 'react'
import ClubForm from "../../components/ClubForm/ClubForm"
import NavBar from "../../components/NavBar/NavBar"
import {Link, useParams} from "react-router-dom";
import axios from "../../axios";
import { connect } from 'react-redux';
import { RootState } from '../../store';

type clubFormDefinition = {
    clubID: number
}

const ClubInfo = (props:any) => {

    let { id } = useParams();

    const [data, setData] = useState({ ID: -1, Name: '', Email: '', Bio: '', Size: 1, Tags: [], Hosts: []});
   
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/clubs/${id}`,
                headers: {
                Authorization: `Bearer ${props.token}`
                          }
                        })
            setData(result.data.Data);
            };

        fetchData();
    }, []);
    
    return (
        <>
            <NavBar isSiteAdmin={false}></NavBar>
            <ClubForm title={"Save Changes"} clubObject={data} isClub={true} token={props.token} />
        </>
    )
};
const mapStateToProps = (state: RootState) => {
    const token = state.system.token;
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(ClubInfo);
