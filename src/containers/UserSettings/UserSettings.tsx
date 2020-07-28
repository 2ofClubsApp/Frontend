import React from 'react'
import UserSettingsForm from '../../components/UserSettingsForm/UserSettingsForm';
import NavBar from "../../components/NavBar/NavBar"

const UserSettings = () => {

    return (
        <>
        <NavBar isSiteAdmin={false}></NavBar>
        <UserSettingsForm title={"Save your profile"}>

        </UserSettingsForm>
        </>
    )
};

export default UserSettings;
