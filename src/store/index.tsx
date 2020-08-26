//import {combineReducers, createStore, applyMiddleware} from "redux"
import {  createStore} from "redux"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { rootReducer } from "./reducers"
//import {SystemActionTypes} from "./actions/actionTypes";

// const middleware = (store: Object) => (next: (action: SystemActionTypes) => void) => (action: SystemActionTypes) => {
//     // Currently used for debugging
//     console.log("Middleware Triggered:", action);
//     console.log(store);
//     console.log(next);
//     next(action);
// };

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

//@ts-ignore
const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
//@ts-ignore
export const persistor = persistStore(store);

export default function configureStore() {
    const store = createStore(
        pReducer,
        //applyMiddleware(middleware)
    );
    return store;
};
