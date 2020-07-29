export const SET_LOGIN = "SET_LOGIN"
export const SET_TOKEN = "SET_TOKEN"

export type isLoggedIn = {
    type: string
    payload: {isLoggedIn: boolean}
}

export type setToken = {
    type: string
    payload: {token: string}
}
  
export type SystemActionTypes = isLoggedIn & setToken