import React from 'react';
import {LandingPage} from "./containers/LandingPage";
import {Route, Switch, Redirect} from "react-router-dom";
import Login from "./containers/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./containers/Signup";
import Home from "./containers/Home";
import {connect} from "react-redux";
import {RootState} from "./store";
import ClubInfo from "./containers/ClubInfo/ClubInfo";
import CreateClub from "./containers/CreateClub";
import ManageClubs from "./containers/ManageClubs/ManageClubs"
import AdvancedSettings from "./containers/ManageClubs/AdvancedSettings"
import UserSettings from "./containers/UserSettings/UserSettings"
import AdminPanel from "./containers/2ofClubsAdmin/AdminPanel"
import ClubRequests from "./containers/2ofClubsAdmin/ClubRequests"
import AdminSettings from "./containers/2ofClubsAdmin/AdminSettings"
import ClubApplication from "./containers/2ofClubsAdmin/ClubApplication"
import AdminLogin from './containers/AdminLogin';
import ResetPassword from './containers/ResetPassword/ResetPassword';

// type AppProps = {
//     system: SystemState
// }<Route exact path={"/admin/userrequests"} component={UserRequests}/>

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
                <Route exact path={"/createclub"} component={CreateClub}/>
                <Route exact path={"/manageclubs"} render={() => {
                    return (props.isLogged ? <ManageClubs /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/manageclubs/advancedsettings/:id"} render={() => {
                    return (props.isLogged ? <AdvancedSettings /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/settings/user"} render={() => {
                    return (props.isLogged ? <UserSettings /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/admin"} component={AdminPanel}/>
                <Route exact path={"/admin/clubrequests"} component={ClubRequests}/>
                <Route exact path={"/admin/settings"} component={AdminSettings}/>
                <Route exact path={"/admin/application"} component={ClubApplication}/>
                <Route exact path={"/resetpassword"} render={() => {
                    return (<ResetPassword/>)}}/>
                <Redirect from={"*"} to={"/"}/>
            </Switch>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    // console.log("islogged in is " + state.system.isLoggedIn);
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username
    }
};

export default connect(mapStateToProps, null)(App);
