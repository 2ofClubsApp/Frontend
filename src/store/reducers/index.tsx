import {SystemActionTypes, SET_LOGIN, SET_TOKEN, SET_USERNAME, SET_EXPIRY} from "../actions/actionTypes";
import {SystemState} from "../types/types";
import { combineReducers } from "redux"

const initialState: SystemState = {
    isLoggedIn: false,
    token: "",
    username: "",
    date: 0
}

const reducer = (state =  initialState, action: SystemActionTypes): SystemState => {
    switch (action.type) {
        case SET_LOGIN:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload.token
            };
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload.username
            };
        case SET_EXPIRY:
            return {
                ...state,
                date: action.payload.date
            };
        default:
            return state;
    }
};
export default reducer;

export const rootReducer = combineReducers({system: reducer});

export type RootState = ReturnType<typeof rootReducer>
