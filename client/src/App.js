import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './components/pages/Homepage'
import Policy from './components/pages/Policy'
import PagenotFound from './components/pages/PagenotFound'
import RegisterForm from './components/pages/Register'
import Header01 from './components/Header01'
import Footer01 from './components/pages/footer01'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/pages/login'

// change

const App = () => {
  return (
    <div>

      <BrowserRouter>
        <Header />
        {/* <Header01></Header01> */}
        <Routes>

          <Route path="/" element={<Homepage />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/*" element={<PagenotFound />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
      <Footer/> 
      {/* <Footer01 /> */}


    </div>
  )
}

export default App