import React, {useEffect, useState} from 'react'
import ClubForm from "../../../../components/Club/ClubForm/ClubForm"
import NavBar from "../../../../components/NavBar/NavBar"
import {useParams} from "react-router-dom";
import axios from "../../../../axios";
import { connect, MapDispatchToProps } from 'react-redux';
import { RootState } from '../../../../store/reducers';
import ErrorPage from '../../../../components/ErrorPage/ErrorPage';
import {setLogin, setToken, setUsername, setExpiry} from "../../../../store/actions/actions";

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
                <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token} setLogin={props.onSetLogin} setToken={props.setToken} />
                <ErrorPage/>
            </>
        )
        
    }
    else{
        return (
            <>
                <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token} setLogin={props.onSetLogin} setToken={props.setToken} />
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

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, null>) => {
    return {
        onSetLogin: (isLogged: boolean) => dispatch(setLogin(isLogged)),
        setToken: (token: string) => dispatch(setToken(token)),
        setUsername: (username: string) => dispatch(setUsername(username)),
        setExpiry: (date: number) => dispatch(setExpiry(date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubInfo);
