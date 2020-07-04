export const SET_LOGIN = "SET_LOGIN"

export type isLoggedIn = {
    type: string
    payload: {isLoggedIn: boolean}
}

export type SystemActionTypes = isLoggedIn
