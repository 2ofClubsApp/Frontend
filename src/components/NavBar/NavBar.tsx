import { Navbar, Nav, Dropdown, NavLink } from "react-bootstrap";
import React from "react";
import {useHistory } from 'react-router-dom'
import { NavLink as RouterNavLink} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from "./NavBar.module.css"
import axios from "../../axios";

library.add(faBars)

type NavBarDefinition = {
    isSiteAdmin: boolean
    userUsername: string
    userToken: string
    setToken: any
    setLogin: any
}

const NavBar = (input: NavBarDefinition) => {
    
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
                document.cookie = "isLogged=; token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                input.setToken("");
                input.setLogin(false);
                return (response.data)
        }).catch(err => {
            console.log(err + " failed to logout");
            document.cookie = "isLogged=; token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            input.setToken("");
            input.setLogin(false);
        });
    };

    if (input.isSiteAdmin) {
        return (
            <>
            <Navbar collapseOnSelect expand="lg" className={"bg d-flex justify-content-center pt-2 " + styles.navbarShadow} variant="dark">
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
            <Navbar collapseOnSelect expand="lg" className={"bg d-flex justify-content-center pt-2"}>
                <h1 className={styles.logo}><RouterNavLink exact to="/" className={styles.logo}>2ofClubs</RouterNavLink></h1>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className={styles.rightNavLinks}>
                        <NavLink className={styles.navbarLink} onClick={() => changeRoute("/explore/events")}>Events</NavLink>
                        <NavLink className={styles.navbarLink} onClick={() => changeRoute("/manageclubs")}>Clubs</NavLink>
                        <Dropdown alignRight>
                        <Dropdown.Toggle id="user-dropdown" as={NavLink} className={styles.navbarLink}>
                            {input.userUsername}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onSelect={() => changeRoute("/explore/favouritedclubs")}>Liked Clubs</Dropdown.Item>
                            <Dropdown.Item onSelect={() => changeRoute("/explore/favouritedevents")}>Attending Events</Dropdown.Item>
                            <Dropdown.Item onSelect={() => changeRoute("/settings/user")}>Settings</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {logout(); changeRoute("/");}}>Log out</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    </Navbar.Collapse>
            </Navbar>
            </>
        )
    }
}

export default NavBar;
