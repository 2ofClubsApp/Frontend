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
