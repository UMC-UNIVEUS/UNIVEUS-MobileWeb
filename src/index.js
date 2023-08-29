import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { createStore } from "redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

const initialState = {
	jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJzZ281MTc4QGt5b25nZ2kuYWMua3IiLCJpYXQiOjE2OTE1MDkwOTEsImV4cCI6MTY5MzU4MjY5MSwiaXNzIjoidW5pdmV1cyJ9.9ADdQk_BQjcxWq4WaftBUGexWdGDGCNm-n0iv6ex1F0"
}

function reducer (state = initialState, action) {
	if (action.type === "UPDATE_TOKEN") {
		return {
			...state,
			jwtToken: action.jwtToken
		}
	} else {
		return state
	}
}

let store = createStore(reducer);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
