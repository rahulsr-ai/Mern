import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/SearchContext';



import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/AddToCardContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>

    <AuthProvider>
      <SearchProvider>
        <CartProvider>


          <App />
          <Toaster />
          <ToastContainer />

        </CartProvider>
      </SearchProvider>
    </AuthProvider>

  </React.StrictMode>
);


