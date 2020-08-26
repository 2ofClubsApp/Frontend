import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import LoadingView from "./LoadingView"
import { persistor, store } from './store';


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