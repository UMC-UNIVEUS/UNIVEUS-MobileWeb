import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.withCredentials = true;
root.render(<App />);

reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
