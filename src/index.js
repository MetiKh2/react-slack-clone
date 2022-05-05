import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {StateProvider} from "./context/StateContext";
import {initialState, reducer} from "./context/StateReducer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
          </StateProvider>
  </React.StrictMode>
);
