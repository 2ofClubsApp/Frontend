import React, { useState, useEffect } from 'react'
import {Container} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import NavBar from "../../../../components/NavBar/NavBar"
import ClubsAdvancedSettingsForm from "../../../../components/Club/ClubManagersTable/ClubManagersTable"
import { RootState } from '../../../../store/reducers';
import { connect, MapDispatchToProps } from 'react-redux';
import axios from "../../../../axios";
import ErrorPage from '../../../../components/ErrorPage/ErrorPage';
import { setLogin, setToken, setUsername, setExpiry } from '../../../../store/actions/actions';

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
            <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token} setLogin={props.onSetLogin} setToken={props.setToken}/>
            <Container className={"d-flex justify-content-center align-items-center mt-5"}>
                <ClubsAdvancedSettingsForm userToken={props.token} clubID={id} clubName={data.name} userUsername={props.username}></ClubsAdvancedSettingsForm>
            </Container>
            </>
        )
    }
    else {
        return (
            <>
                <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token} setLogin={props.onSetLogin} setToken={props.setToken}/>
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

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, null>) => {
    return {
        onSetLogin: (isLogged: boolean) => dispatch(setLogin(isLogged)),
        setToken: (token: string) => dispatch(setToken(token)),
        setUsername: (username: string) => dispatch(setUsername(username)),
        setExpiry: (date: number) => dispatch(setExpiry(date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSettings);
