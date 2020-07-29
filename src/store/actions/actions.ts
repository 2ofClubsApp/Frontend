import {SET_LOGIN, SET_TOKEN} from "./actionTypes";

export const setLogin = (isLoggedIn: boolean) => {
    return {
            type: SET_LOGIN,
            payload: {isLoggedIn: isLoggedIn}
        }
}

export const setToken = (token: string) => {
    return {
        type: SET_TOKEN,
        payload: {token: token}
    }
  }
