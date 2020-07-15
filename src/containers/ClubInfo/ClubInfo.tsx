import React from 'react'
import ClubForm from "../../components/ClubForm/ClubForm"
import NavBar from "../../components/NavBar/NavBar"


const ClubInfo = () => {

    return (
        <>
            <NavBar></NavBar>

            <ClubForm title={"Save Changes"} isClub={true}>

            </ClubForm>
        </>
    )
};

export default ClubInfo;
