import React, {useEffect, useState} from 'react'
import ClubForm from "../../components/ClubForm/ClubForm"
import NavBar from "../../components/NavBar/NavBar"
import {useParams} from "react-router-dom";
import axios from "../../axios";
import { connect } from 'react-redux';
import { RootState } from '../../store';
import {Container} from "react-bootstrap";
import ErrorPage from '../../components/ErrorPage/ErrorPage';

type clubFormDefinition = {
    clubID: number
}

const ClubInfo = (props:any) => {

    let { id } = useParams();

    const [data, setData] = useState({ id: -1, name: '', email: '', bio: '', size: 1, tags: [], hosts: []});
   
    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: 'get', //you can set what request you want to be
                url: `/clubs/${id}`,
                headers: {
                Authorization: `Bearer ${props.token}`
                          }
                        })
                .then ((result: any) => {
                    if (result.data.code !== -1) {
                        setData(result.data.data);
                    }
                })
            };

        fetchData();
    }, [id, props.token]);

    if (data.id === -1) {
        return (
            <>
                <NavBar isSiteAdmin={false}></NavBar>
                <ErrorPage/>
                
            </>
        )
        
    }
    else{
        return (
            <>
                <NavBar isSiteAdmin={false}></NavBar>
                <ClubForm title={"Save Changes"} clubObject={data} clubID={id} isClub={true} token={props.token} />
            </>
        
        )
    }
    
    
};
const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(ClubInfo);
