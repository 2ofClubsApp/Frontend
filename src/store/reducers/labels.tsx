import {actionDefinition, SET_LOGIN, SET_USERDATA} from "../actions/actionTypes";
import {User} from "../types/users/types";

const initialState: User = {
    isLoggedIn: false,
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export default function (state = initialState, action: actionDefinition) {
    console.log(action)
    switch (action.type) {
        case SET_USERDATA:
            console.log("bananas");
            break;
        case SET_LOGIN:
            return {
                ...state,
                isLoggedIn: action.payload
            }
        default:
            return state;
    }
}
