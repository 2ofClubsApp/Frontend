import {SystemActionTypes, SET_LOGIN} from "../actions/actionTypes";
import {SystemState} from "../types/types";

const initialState: SystemState = {
    isLoggedIn: false
}

const reducer = (state =  initialState, action: SystemActionTypes): SystemState => {
    switch (action.type) {
        case SET_LOGIN:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn
            };
        default:
            return state;
    }
};
export default reducer;
