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
            <NavBar isSiteAdmin={false}></NavBar>
                <ClubForm title={"Submit for review"} isClub={true} clubObject={emptyClub} clubID={-1} token={props.token}/>
        </>
    )
};

// const mapDispatchToProps = (dispatch: MapDispatchToProps<any, null>) => {
//     return {
//         onSetLogin: () => dispatch(setLogin(true)),
//         setToken: (token: string) => dispatch(setToken(token))
//     }
// }

// const mapStateToProps = (state: RootState) => {
//     return {
//         isLogged: state.system.isLoggedIn,
//         token: state.system.token
//     };
// };
//connect(mapStateToProps, mapDispatchToProps)(

const mapStateToProps = (state: RootState) => {
    // console.log("islogged in is " + state.system.isLoggedIn);
    // console.log("token is " + state.system.token);
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username
    }
};

export default connect(mapStateToProps, null)(CreateClub);
