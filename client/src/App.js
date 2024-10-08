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
import Dashboard from './components/user/Dashboard'
import PrivateRoute from './components/routes/PrivateRoute'
import ForgetPassword from './components/pages/ForgetPassword'
import PassChange from './components/pages/PassChange'
import AdminRoute from './components/routes/AdminRoute'

// change

const App = () => {
  return (
    <div className='min-h-screen w-full p-0 m-0 relative '>

      <BrowserRouter>
        <Header01></Header01>
        {/* <Header /> */}
        <Routes>

          <Route path="/" element={<Homepage />} />
          <Route path="/policy" element={<Policy />} />

        
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<Dashboard />} />
          </Route>

          <Route path="/*" element={<PagenotFound />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/PassChange" element={<PassChange />} />

        </Routes>
      </BrowserRouter>
      {/* <Footer/>  */}
      <Footer01 />


    </div>
  )
}

export default App