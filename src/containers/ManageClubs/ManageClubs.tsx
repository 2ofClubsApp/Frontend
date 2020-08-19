import React from 'react'
import {Container} from "react-bootstrap";
import ClubsOverview from "../../components/ClubsOverviewTable/ClubsOverview";
// import {useHistory} from 'react-router-dom'
import NavBar from "../../components/NavBar/NavBar"
import { connect } from 'react-redux';
import { RootState } from '../../store';
import jwt_decode from 'jwt-decode';


const ManageClubs = (props: any) => {
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

    const decode = () => {
        const decoded = jwt_decode(props.token);
        return decoded;
    }

    decode();
    
    //console.log("manageclubs token:" + props.token);
//<ClubsOverview title={"Your Clubs"} view={true} token={props.token}></ClubsOverview>
    return (
        <>
        <NavBar isSiteAdmin={false}></NavBar>
        <Container className={"d-flex justify-content-center align-items-center mt-5"}>
            <ClubsOverview newUsername={props.username} newToken={props.token}/>
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

export default connect(mapStateToProps)(ManageClubs);