import React, { useState, useEffect } from 'react'
import {Container} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import NavBar from "../../components/NavBar/NavBar"
import ClubsAdvancedSettingsForm from "../../components/ClubAdvancedSettings/ClubsAdvancedSettingsForm"
import { RootState } from '../../store';
import { connect } from 'react-redux';
import axios from "../../axios";

const AdvancedSettings = (props: any) => {
    // const history = useHistory();
    // const changeRoute = (path: string) => {
    //     history.replace({pathname: path})
    // };

    // const [state, setState] = React.useState({
    //     username: "",
    //     password: "",
    // });

    // const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     const value = event.target.value
    //     const id = event.target.id
    //     setState({
    //         ...state,
    //         [id]: value
    //     })
    // }
    let { id } = useParams();

    const [data, setData] = useState({ id: -1, name: '', email: '', bio: '', size: 1, tags: [], hosts: []});
   
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/clubs/${id}`,
                headers: {
                Authorization: `Bearer ${props.token}`
                          }
                        })
            setData(result.data.data);
            };

        fetchData();
    }, [id, props.token]);
    
    return (
        <>
        <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token}></NavBar>
        <Container className={"d-flex justify-content-center align-items-center mt-5"}>
            <ClubsAdvancedSettingsForm newToken={props.token} clubID={id} clubName={data.name}></ClubsAdvancedSettingsForm>
        </Container>
        </>
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

export default connect(mapStateToProps)(AdvancedSettings);
