import React from 'react'
import ClubForm from '../../components/ClubForm/ClubForm';
import NavBar from "../../components/NavBar/NavBar"

const UserSettings = () => {

    return (
        <>
        <NavBar></NavBar>
        <ClubForm title={"Save your profile"} isClub={false}>

        </ClubForm>
        </>
    )
};

export default UserSettings;
