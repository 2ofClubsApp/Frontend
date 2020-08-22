export const SET_LOGIN = "SET_LOGIN"
export const SET_TOKEN = "SET_TOKEN"
export const SET_USERNAME = "SET_USERNAME"
export const SET_EXPIRY = "SET_EXPIRY"

export type isLoggedIn = {
    type: string
    payload: {isLoggedIn: boolean}
}

export type setToken = {
    type: string
    payload: {token: string}
}

export type setUsername = {
    type: string
    payload: {username: string}
}

export type setExpiry = {
    type: string
    payload: {date: number}
}
  
export type SystemActionTypes = isLoggedIn & setToken & setUsername & setExpiry