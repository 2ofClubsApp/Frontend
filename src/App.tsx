import React from 'react';
import LandingPage from "./containers/LandingPage";
import {Route, Switch, Redirect} from "react-router-dom";
import Login from "./containers/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./containers/Signup";
import Home from "./containers/Users/UserHome/UserHome";
import {connect, MapDispatchToProps} from "react-redux";
import { RootState } from "./store/reducers";
import ClubInfo from "./containers/Users/Clubs/ClubInfo/ClubInfo";
import CreateClub from "./containers/Users/Clubs/CreateClub/CreateClub";
import ManageClubs from "./containers/Users/Clubs/ManageClubs/ManageClubs"
import AdvancedSettings from "./containers/Users/Clubs/ManageClubs/AdvancedSettings"
import UserSettings from "./containers/Users/UserSettings/UserSettings"
import AdminPanel from "./containers/2ofClubsAdmin/AdminHome/AdminHome"
import ClubRequests from "./containers/2ofClubsAdmin/ClubRequests/ClubRequests"
import AdminSettings from "./containers/2ofClubsAdmin/AdminTagSettings/AdminTagSettings"
import AdminLogin from './containers/AdminLogin';
import ResetPassword from './containers/ResetPassword/ResetPassword';
import ExploreAllEvents from './containers/Users/Events/ExploreEvents/ExploreAllEvents';
import FavouritedEvents from './containers/Users/Events/ExploreEvents/FavouritedEvents';
import UserRequests from './containers/2ofClubsAdmin/UserRequests/UserRequests';
import { setLogin, setToken, setUsername, setExpiry } from './store/actions/actions';
import FavouritedClubs from './containers/Users/Clubs/LikedClubs/FavouritedClubs';
import axios from "./axios";
import ResetPasswordEmail from './containers/ResetPassword/ResetPasswordEmail';

const App = (props: any) => {
    // returns the cookie with the given name,
    // or undefined if not found
    function getCookie(name: string) {
        let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    if (!getCookie("isLogged")){
        props.onSetLogin(false);
    }
    
    // console.log(getCookie("RefreshToken"));

    // axios.post('/refreshToken', {withCredentials: true})
    //             .then((response: any) => {
    //                 if (response.code === 1) {
    //                     setToken(response.data)
    //                 }
    //                 else {
    //                 }
    //             })

    if (props.isLogged) {
        var x = setInterval(function() {
            
        var now = new Date().getTime();

        var distance = props.expiry - now;
    
        if (distance < 0) {
            props.setToken("")
            props.setUsername("")
            props.setExpiry(0)
            props.onSetLogin(false);
            clearInterval(x);
        }
        else if (!props.isLogged) {
            clearInterval(x);
        }
        }, 1000);
    }

    return (
        <div>
            <Switch>
                <Route exact path={"/"} render={() => {
                    return ((props.isLogged && getCookie("isLogged") && props.username !== "admin") ? <Home /> : ((props.isLogged && getCookie("isLogged") && props.username === "admin") ? <AdminPanel /> : <LandingPage />))}}/>
                <Route exact path={"/login"} component={Login}/>
                <Route exact path={"/adminlogin"} component={AdminLogin}/>
                <Route exact path={"/signup"} component={SignUp}/>
                <Route exact path={"/settings/info/:id"} render={() => {
                    return (props.isLogged && getCookie("isLogged") ? <ClubInfo /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/club/create"} render={() => {
                    return (props.isLogged && getCookie("isLogged") ? <CreateClub /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/manageclubs"} render={() => {
                    return (props.isLogged && getCookie("isLogged") ? <ManageClubs /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/manageclubs/advancedsettings/:id"} render={() => {
                    return (props.isLogged && getCookie("isLogged") ? <AdvancedSettings /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/settings/user"} render={() => {
                    return (props.isLogged && getCookie("isLogged") ? <UserSettings /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/admin"} component={AdminPanel}/>
                <Route exact path={"/admin/requests/clubs"} render={() => {
                    return (props.isLogged && getCookie("isLogged") ? <ClubRequests /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/admin/requests/users"} render={() => {
                    return (props.isLogged && getCookie("isLogged") ? <UserRequests /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/admin/tags"} render={() => {
                    return (props.isLogged && getCookie("isLogged") ? <AdminSettings /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/emailreset"} render={() => {return (<ResetPasswordEmail />)}}/>
                <Route exact path={"/resetpassword/:user/:token"} render={() => {return (<ResetPassword />)}}/>
                <Route exact path={"/explore/events"} render={() => {
                    return (props.isLogged && getCookie("isLogged") ? <ExploreAllEvents /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/explore/favouritedevents"} render={() => {
                    return (props.isLogged && getCookie("isLogged") ? <FavouritedEvents /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/explore/favouritedclubs"} render={() => {
                    return (props.isLogged && getCookie("isLogged") ? <FavouritedClubs /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Redirect from={"*"} to={"/"}/>
            </Switch>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        expiry: state.system.date
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
