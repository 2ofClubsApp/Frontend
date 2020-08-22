import React from 'react'
import ClubForm from '../components/ClubForm/ClubForm';
import NavBar from "../components/NavBar/NavBar"
//import {useHistory} from 'react-router-dom'
import { connect} from 'react-redux';
import { RootState } from '../store';

const CreateClub = (props:any) => {
    // const history = useHistory();
    
    // const changeRoute = (path: string) => {
    //     history.replace({pathname: path})
    // };

    const emptyClub = { 
                    id: -1, 
                    name: '', 
                    email: '', 
                    bio: '', 
                    size: 1, 
                    tags: [], 
                    hosts: []}

    return (
        <>
            <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token}></NavBar>
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

export default connect(mapStateToProps, null)(CreateClub);
