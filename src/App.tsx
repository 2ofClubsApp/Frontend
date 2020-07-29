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
import Requests from "./containers/2ofClubsAdmin/Requests"
import AdminSettings from "./containers/2ofClubsAdmin/AdminSettings"
import ClubApplication from "./containers/2ofClubsAdmin/ClubApplication"

// type AppProps = {
//     system: SystemState
// }

const App = (props: any) => {
    return (
        <div>
            <Switch>
                <Route exact path={"/"} render={() => {
                    return (props.isLogged ? <Home /> : <LandingPage />)}}/>
                <Route exact path={"/login"} component={Login}/>
                <Route exact path={"/signup"} component={SignUp}/>
                <Route exact path={"/settings/info"} component={ClubInfo}/>
                <Route exact path={"/createclub"} render={() => {
                    return (props.isLogged ? <CreateClub /> : <Redirect from={"*"} to={"/"}/>)}}/>
                <Route exact path={"/manageclubs"} component={ManageClubs}/>
                <Route exact path={"/manageclubs/advancedsettings"} component={AdvancedSettings}/>
                <Route exact path={"/settings/user"} component={UserSettings}/>
                <Route exact path={"/admin"} component={AdminPanel}/>
                <Route exact path={"/admin/requests"} component={Requests}/>
                <Route exact path={"/admin/settings"} component={AdminSettings}/>
                <Route exact path={"/admin/application"} component={ClubApplication}/>
                <Redirect from={"*"} to={"/"}/>
            </Switch>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    console.log("islogged in is " + state.system.isLoggedIn);
    console.log("token is " + state.system.token);
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token
    }
};

export default connect(mapStateToProps, null)(App);
