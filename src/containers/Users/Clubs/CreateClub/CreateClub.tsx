import React from 'react'
import ClubForm from '../../../../components/Club/ClubForm/ClubForm';
import NavBar from "../../../../components/NavBar/NavBar"
import { connect, MapDispatchToProps} from 'react-redux';
import { RootState } from '../../../../store/reducers';
import { setLogin, setToken, setUsername, setExpiry } from '../../../../store/actions/actions';

const CreateClub = (props:any) => {
    const emptyClub = { 
                    id: -1, 
                    name: '', 
                    email: '', 
                    bio: '',
                    logo: '',
                    size: 1, 
                    tags: [], 
                    hosts: []}

    return (
        <>
            <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token} setLogin={props.onSetLogin} setToken={props.setToken}/>
            <ClubForm title={"Submit for review"} isClub={true} clubObject={emptyClub} clubID={-1} token={props.token}/>
        </>
    )
};

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username
    }
};

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, null>) => {
    return {
        onSetLogin: (isLogged: boolean) => dispatch(setLogin(isLogged)),
        setToken: (token: string) => dispatch(setToken(token)),
        setUsername: (username: string) => dispatch(setUsername(username)),
        setExpiry: (date: number) => dispatch(setExpiry(date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClub);
