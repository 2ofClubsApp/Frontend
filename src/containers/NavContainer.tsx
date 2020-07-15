import React from "react";
import NavBar from "../components/NavBar/NavBar"

const NavContainer = (propz:React.ReactNode) => {

    return (
        <div>
            <NavBar/>
            {propz}
        </div>
        )}

export default NavContainer