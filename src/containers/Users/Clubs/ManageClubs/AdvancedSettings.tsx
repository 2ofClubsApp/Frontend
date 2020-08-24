import React, { useState, useEffect } from 'react'
import {Container} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import NavBar from "../../../../components/NavBar/NavBar"
import ClubsAdvancedSettingsForm from "../../../../components/Club/ClubManagersTable/ClubManagersTable"
import { RootState } from '../../../../store';
import { connect } from 'react-redux';
import axios from "../../../../axios";
import ErrorPage from '../../../../components/ErrorPage/ErrorPage';

const AdvancedSettings = (props: any) => {
    let { id } = useParams();

    const [data, setData] = useState({ id: -1, name: '', email: '', bio: '', size: 1, tags: [], hosts: []});

    const [foundClub, setFoundClub] = useState(false)
   
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
                setData(result.data.data);
                setFoundClub(true);
            })
            .catch( err => {
                setFoundClub(false);
            })
            };

        fetchData();
    }, [id, props.token]);

    if (foundClub) {
        return (
            <>
            <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token}></NavBar>
            <Container className={"d-flex justify-content-center align-items-center mt-5"}>
                <ClubsAdvancedSettingsForm userToken={props.token} clubID={id} clubName={data.name} userUsername={props.username}></ClubsAdvancedSettingsForm>
            </Container>
            </>
        )
    }
    else {
        return (
            <>
                <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token}></NavBar>
                <ErrorPage/>
            </>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(AdvancedSettings);
