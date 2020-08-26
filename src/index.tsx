import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "./store"
import { PersistGate } from 'redux-persist/lib/integration/react';
import LoadingView from "./LoadingView"

// import the two exports from the last code snippet.
import { persistor, store } from './store';

// const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate loading={<LoadingView />} persistor={persistor}>
                <App/>
            </PersistGate>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);