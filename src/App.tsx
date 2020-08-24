import React from 'react';
import {LandingPage} from "./containers/LandingPage";
import {Route, Switch, Redirect} from "react-router-dom";
import Login from "./containers/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./containers/Signup";
import Home from "./containers/Users/UserHome/UserHome";
import {connect} from "react-redux";
import {RootState} from "./store";
import ClubInfo from "./containers/Users/Clubs/ClubInfo/ClubInfo";
import CreateClub from "./containers/Users/Clubs/CreateClub/CreateClub";
import ManageClubs from "./containers/Users/Clubs/ManageClubs/ManageClubs"
import AdvancedSettings from "./containers/Users/Clubs/ManageClubs/AdvancedSettings"
import UserSettings from "./containers/Users/UserSettings/UserSettings"
import AdminPanel from "./containers/2ofClubsAdmin/AdminHome/AdminHome"
import ClubRequests from "./containers/2ofClubsAdmin/ClubRequests/ClubRequests"
import AdminSettings from "./containers/2ofClubsAdmin/AdminSettings/AdminSettings"
import AdminLogin from './containers/AdminLogin';
import ResetPassword from './containers/ResetPassword/ResetPassword';
import ExploreAllEvents from './containers/Users/Events/ExploreEvents/ExploreAllEvents';
import YourEvents from './containers/Users/Events/ExploreEvents/YourEvents';
import UserRequests from './containers/2ofClubsAdmin/UserRequests/UserRequests';

const App = (props: any) => {
    return (
        <div>
            <Switch>
                <Route exact path={"/"} render={() => {
                    return ((props.isLogged && props.username !== "admin") ? <Home /> : ((props.username === "admin") ? <AdminPanel /> : <LandingPage />))}}/>
                <Route exact path={"/login"} component={Login}/>
                <Route exact path={"/adminlogin"} component={AdminLogin}/>
                <Route exact path={"/signup"} component={SignUp}/>
                <Route exact path={"/settings/info/:id"} render={() => {
                    return (props.isLogged ? <ClubInfo /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/club/create"} render={() => {
                    return (props.isLogged ? <CreateClub /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/manageclubs"} render={() => {
                    return (props.isLogged ? <ManageClubs /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/manageclubs/advancedsettings/:id"} render={() => {
                    return (props.isLogged ? <AdvancedSettings /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/settings/user"} render={() => {
                    return (props.isLogged ? <UserSettings /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/admin"} component={AdminPanel}/>
                <Route exact path={"/admin/requests/clubs"} render={() => {
                    return (props.isLogged ? <ClubRequests /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/admin/requests/users"} render={() => {
                    return (props.isLogged ? <UserRequests /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/admin/tags"} render={() => {
                    return (props.isLogged ? <AdminSettings /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/resetpassword"} render={() => {return (<ResetPassword/>)}}/>
                <Route exact path={"/explore/events"} render={() => {
                    return (props.isLogged ? <ExploreAllEvents /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/explore/yourevents"} render={() => {
                    return (props.isLogged ? <YourEvents /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Redirect from={"*"} to={"/"}/>
            </Switch>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username
    }
};

export default connect(mapStateToProps, null)(App);
