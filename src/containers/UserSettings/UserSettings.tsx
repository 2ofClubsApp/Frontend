import React from 'react'
import ClubForm from '../../components/ClubForm/ClubForm';
import NavBar from "../../components/NavBar/NavBar"
import { faFlushed } from '@fortawesome/free-solid-svg-icons';

const UserSettings = () => {

    return (
        <>
        <NavBar isSiteAdmin={false}></NavBar>
        <ClubForm title={"Save your profile"} isClub={false}>

        </ClubForm>
        </>
    )
};

export default UserSettings;
