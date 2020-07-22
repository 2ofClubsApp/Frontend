import React from 'react';
import {LandingPage} from "./containers/LandingPage";
import {Route, Switch, Redirect} from "react-router-dom";
import Login from "./containers/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./containers/Signup";
import Home from "./containers/Home";
import {connect} from "react-redux";
import {RootState} from "./store";
import Explore from "./containers/Explore";
import ClubInfo from "./containers/ClubInfo/ClubInfo";
import CreateClub from "./containers/CreateClub";
import ManageClubs from "./containers/ManageClubs/ManageClubs"
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
                    return (props.isLogged ? <Home/> : <LandingPage/>)}}/>
                <Route exact path={"/login"} component={Login}/>
                <Route exact path={"/signup"} component={SignUp}/>
                <Route exact path={"/explore"} component={Explore}/>
                <Route exact path={"/settings/info"} component={ClubInfo}/>
                <Route exact path={"/createclub"} component={CreateClub}/>
                <Route exact path={"/manageclubs"} component={ManageClubs}/>
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
    return {
        isLogged: state.system.isLoggedIn
    }
};

export default connect(mapStateToProps, null)(App);
