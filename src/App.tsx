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
import ManageClubs from "./containers/ManageClubs"

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
                <Route exact path={"/manageclubs"} component={ManageClubs}/>
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
