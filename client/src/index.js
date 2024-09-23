import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import {Toaster} from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  // <React.StrictMode>
  <>
    <App />
    <Toaster/>
    <ToastContainer/>
  </>
  // </React.StrictMode>
);


