import React, { useEffect } from 'react'
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
import AdminDashboard from './components/pages/Admin/AdminDashboard'


import { useAuth } from './context/auth'
import Categories from './components/pages/Admin/Categories'
import Products from './components/pages/Admin/Products'
import Users from './components/pages/Admin/Users'
import Profile from './components/user/Profile'
import Order from './components/user/Order'

// change

const App = () => {
  const [isLogin, setisLogin] = useAuth()
  useEffect(()=> { 
  
    

  },[isLogin])


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
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/order" element={<Order />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />

            <Route path="admin/categories" element={<Categories />} />
            <Route path="admin/product" element={<Products />} />
            <Route path="admin/users" element={<Users />} />

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