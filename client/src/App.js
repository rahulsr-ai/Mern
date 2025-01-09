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
import CreateProduct from './components/pages/Admin/CreateProduct'
import Users from './components/pages/Admin/Users'
import Profile from './components/user/Profile'
import Order from './components/user/Order'
import GetProduct from './components/pages/Admin/GetProduct'
import UpdateProduct from './components/pages/Admin/UpdateProduct'
import SearchPage from './components/pages/Search'

import NavScrollExample from "./components/BootStrap/NavScrollExample"
import OffcanvasExample from './components/BootStrap/BootstrapNavbar'
import BootstrapNavbar from './components/BootStrap/BootstrapNavbar'
import OffcanvasExample02 from './components/BootStrap/AnotherNavbar'
import MyNavbar from './components/BootStrap/AnotherNavbar'
import Productdetails from './components/pages/Product-details'




// change

const App = () => {
  const [isLogin, setisLogin] = useAuth()
  useEffect(() => {



  }, [isLogin])


  return (


    <div className='min-h-screen w-full p-0 m-0 relative '>

      <BrowserRouter>

        <Header01></Header01>
        {/* <Header /> */}
 
        {/* <OffcanvasExample02/> */}
        {/* <MyNavbar/> */}
        {/* <NavScrollExample /> */}
        {/* <OffcanvasExample /> */}
        {/* <BootstrapNavbar/> */}

        <Routes>

          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/policy" element={<Policy />} />


          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/order" element={<Order />} />
            <Route path="user/Product-details" element={<Productdetails/>} />

          </Route>


          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/categories" element={<Categories />} />
            <Route path="admin/product" element={<CreateProduct />} />
            <Route path="admin/GetProduct" element={<GetProduct />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/product/:slug" element={< UpdateProduct />} />
          </Route>


          <Route path="/*" element={<PagenotFound />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/PassChange" element={<PassChange />} />
          {/* <Route path="/category" element={<Categories />} /> */}

        </Routes>
      </BrowserRouter>
      {/* <Footer/>  */}
      {/* <Footer01 /> */}


    </div>


  )
}

export default App