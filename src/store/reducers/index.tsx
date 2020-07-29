import {SystemActionTypes, SET_LOGIN, SET_TOKEN} from "../actions/actionTypes";
import {SystemState} from "../types/types";

const initialState: SystemState = {
    isLoggedIn: false,
    token: ""
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
        default:
            return state;
    }
};
export default reducer;
