import { Navbar, Nav, Dropdown, NavLink} from "react-bootstrap";
import React from "react";
import {useHistory, Link} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "./NavBar.css"

library.add(faBars)

type NavBarDefinition = {
    isSiteAdmin: boolean
}

const NavBar = (props: NavBarDefinition) => {
    
    const history = useHistory();
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };

    if (props.isSiteAdmin) {
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
                            <Dropdown.Item href="/">Log out</Dropdown.Item>
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
export default NavBar
