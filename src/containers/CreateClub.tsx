import React from 'react'
import ClubForm from '../components/ClubForm/ClubForm';
import NavBar from "../components/NavBar/NavBar"
import {useHistory} from 'react-router-dom'
import { connect, MapDispatchToProps } from 'react-redux';
import { setLogin, setToken } from '../store/actions/actions';
import { RootState } from '../store';

const CreateClub = (props:any) => {
    const history = useHistory();
    
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };

    return (
        <>
            <NavBar isSiteAdmin={false}></NavBar>
            <ClubForm title={"Submit for review"} isClub={true}>

            </ClubForm>
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

export default CreateClub;
