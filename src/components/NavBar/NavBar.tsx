import { Navbar, Nav, Dropdown, NavLink} from "react-bootstrap";
import React from "react";
import {useHistory, Link} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "./NavBar.css"
import axios from "../../axios";
import { RootState } from "../../store";
import { connect } from "react-redux";

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
                <Link to="/">2OFCLUBS</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Dropdown alignRight>
                        <Dropdown.Toggle id="user-dropdown" as={NavLink}>
                            <FontAwesomeIcon icon={faBars}/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onSelect={() => changeRoute("/admin")}>Home</Dropdown.Item>
                            <Dropdown.Item onSelect={() => changeRoute("/admin/requests")}>Requests</Dropdown.Item>
                            <Dropdown.Item onSelect={() => changeRoute("/admin/settings")}>Settings</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {logout(); changeRoute("/")}}>Log out</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    </Navbar.Collapse>
            </Navbar>
            </>
        )
    }
    else {
        return (
            <>
            <Navbar collapseOnSelect expand="lg" className={"bg d-flex justify-content- pt-2"} variant="dark">
                <Link to="/">2OFCLUBS</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Dropdown alignRight>
                        <Dropdown.Toggle id="user-dropdown" as={NavLink}>
                            <FontAwesomeIcon icon={faBars}/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>

                            <Dropdown.Item onSelect={() => changeRoute("/createclub")}>Create a club</Dropdown.Item>
                            <Dropdown.Item onSelect={() => changeRoute("/explore/events")}>Explore Events</Dropdown.Item>
                            <Dropdown.Item onSelect={() => changeRoute("/explore/yourevents")}>Explore Your Events</Dropdown.Item>
                            <Dropdown.Item onSelect={() => changeRoute("/manageclubs")}>Manage your clubs</Dropdown.Item>
                            <Dropdown.Item onSelect={() => changeRoute("/settings/user")}>Your settings</Dropdown.Item>
                            <Dropdown.Item href="/">Log out</Dropdown.Item>
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
