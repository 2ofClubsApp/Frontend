import {SET_LOGIN, SET_TOKEN, SET_USERNAME, SET_EXPIRY} from "./actionTypes";

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

  export const setUsername = (username: string) => {
    return {
        type: SET_USERNAME,
        payload: {username: username}
    }
  }

  export const setExpiry = (date: number) => {
    return {
        type: SET_EXPIRY,
        payload: {date: date}
    }
  }