import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {MainContextProvider} from "./hooks/useNewContext.jsx"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MainContextProvider>
      <App />
    </MainContextProvider>
);

