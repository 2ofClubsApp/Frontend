//import {combineReducers, createStore, applyMiddleware} from "redux"
import {combineReducers, createStore} from "redux"
import reducer from "./reducers"
//import {SystemActionTypes} from "./actions/actionTypes";

export const rootReducer = combineReducers({system: reducer});

export type RootState = ReturnType<typeof rootReducer>

// const middleware = (store: Object) => (next: (action: SystemActionTypes) => void) => (action: SystemActionTypes) => {
//     // Currently used for debugging
//     console.log("Middleware Triggered:", action);
//     console.log(store);
//     console.log(next);
//     next(action);
// };

export default function configureStore() {
    const store = createStore(
        rootReducer,
        //applyMiddleware(middleware)
    );
    return store;
};
