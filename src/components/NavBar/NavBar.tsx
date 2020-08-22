import { Navbar, Nav, Dropdown, NavLink, NavDropdown} from "react-bootstrap";
import React from "react";
import {useHistory } from 'react-router-dom'
import { NavLink as RouterNavLink} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from "./NavBar.module.css"
import axios from "../../axios";
import { RootState } from "../../store";
import { connect } from "react-redux";
import {setLogin, setToken, setUsername, setExpiry} from "../../store/actions/actions";

library.add(faBars)

type NavBarDefinition = {
    isSiteAdmin: boolean
    userUsername: string
    userToken: string
}

const NavBar = (input: NavBarDefinition, props: any) => {
    
    const history = useHistory();

    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };

    const logout = async () => {
        return axios({
            method: 'post', //you can set what request you want to be
            url: `/logout/${input.userUsername}`,
            headers: {
                Authorization: `Bearer ${input.userToken}`
            },
            }).then((response: any) => {
                console.log(response.data)
                return (response.data)
        }).catch(err => {
            console.log(err + " failed to logout");
        });
    };

    if (input.isSiteAdmin) {
        return (
            <>
            <Navbar collapseOnSelect expand="lg" className={"bg d-flex justify-content-center pt-2"} variant="dark">
                <h1 className={styles.logo}><RouterNavLink exact to="/" className={styles.logo}>2ofClubs</RouterNavLink></h1>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavLink className={styles.navbarLink} onClick={() => changeRoute("/admin")}>Home</NavLink>
                        <NavLink className={styles.navbarLink} onClick={() => {logout(); changeRoute("/")}}>Logout</NavLink>
                    </Nav>
                    </Navbar.Collapse>
            </Navbar>
            </>
        )
    }
    else {
        return (
            <>
            <Navbar collapseOnSelect expand="lg" className={"bg d-flex justify-content- pt-2"}>
                <h1 className={styles.logo}><RouterNavLink exact to="/" className={styles.logo}>2ofClubs</RouterNavLink></h1>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavLink className={styles.navbarLink} onClick={() => changeRoute("/manageclubs")}>Clubs</NavLink>
                        <NavLink className={styles.navbarLink} onClick={() => changeRoute("/explore/events")}>Events</NavLink>
                        <Dropdown alignRight>
                        <Dropdown.Toggle id="user-dropdown" as={NavLink} className={styles.navbarLink}>
                            {input.userUsername}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onSelect={() => changeRoute("/settings/user")}>Settings</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {logout(); setToken(""); setLogin(false);}}>Log out</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    </Navbar.Collapse>
            </Navbar>
            </>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(NavBar);
