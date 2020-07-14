import {Button, Navbar, Nav, NavDropdown, Dropdown, NavLink} from "react-bootstrap";
import React from "react";
import {useHistory} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "./NavBar.css"

library.add(faBars)

const NavBar = () => {
    
    const history = useHistory();
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };

    return (
        <>
        <Navbar collapseOnSelect expand="lg" className={"bluebg d-flex justify-content-end"}>
            <Button variant="outline-light" className="m-2 text-uppercase" onClick={() => changeRoute('/')}>2OFCLUBS
            </Button>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Dropdown alignRight>
                    <Dropdown.Toggle id="user-dropdown" as={NavLink}>
                        <FontAwesomeIcon icon={faBars}/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>

                        <Dropdown.Item href="/">Create a club</Dropdown.Item>
                        <Dropdown.Item href="/">Manage your clubs</Dropdown.Item>
                        <Dropdown.Item href="/">Your settings</Dropdown.Item>
                        <Dropdown.Item href="/">Log out</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </Nav>
                </Navbar.Collapse>
        </Navbar>
        </>
    )
}
export default NavBar
