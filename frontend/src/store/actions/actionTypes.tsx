export const SET_USERDATA = "SET_USERDATA"
export const SET_LOGIN = "SET_LOGIN"

export type actionDefinition = {
    type: string
    payload: any
}

export type isLoggedIn = {
    type: string
    payload: boolean
}
