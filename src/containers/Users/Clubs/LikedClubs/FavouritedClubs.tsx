import React from 'react'
import {Container} from "react-bootstrap";
import NavBar from "../../../../components/NavBar/NavBar"
import { connect, MapDispatchToProps } from 'react-redux';
import { RootState } from '../../../../store/reducers';
import jwt_decode from 'jwt-decode';
import { setLogin, setToken, setUsername, setExpiry } from '../../../../store/actions/actions';
import FavouritedClubsListingTable from "../../../../components/User/FavouritedClubs/FavouritedClubsTable"


const ManageClubs = (props: any) => {
    
    const decode = () => {
        const decoded = jwt_decode(props.token);
        return decoded;
    }

    decode();
    
    return (
        <>
        <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token} setLogin={props.onSetLogin} setToken={props.setToken} />
        <Container className={"d-flex justify-content-center align-items-center mt-5"}>
            <FavouritedClubsListingTable newUsername={props.username} newToken={props.token} />
        </Container>
        </>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClubs);
