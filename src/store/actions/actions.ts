import {SET_LOGIN} from "./actionTypes";

export const setLogin = (isLoggedIn: boolean) => {
    return {
            type: SET_LOGIN,
            payload: {isLoggedIn: isLoggedIn}
        }
}
