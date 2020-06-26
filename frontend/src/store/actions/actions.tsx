import {SET_LOGIN, SET_USERDATA} from "./actionTypes";
import React from "react";

export const setUserData = (id: string, value: string) => {
    return (
        {
            type: SET_USERDATA,
            payload: {id: value}
        }
    )
}

export const setLogin = (isLoggedIn: boolean) => {
    return (
        {
            type: SET_LOGIN,
            payload: {isLoggedIn}
        }
    )
}
