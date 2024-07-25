import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store/index.js';
import axios from 'axios'

// const baseUrl = "http://localhost:8000/"
// const baseUrl = "http://193.203.162.221:8000/"
const baseUrl = "https://api.unzziptruth.com/"


axios.defaults.baseURL = baseUrl
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

