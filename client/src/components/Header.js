import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"
const Header = () => {
    return (
        <div className='hbox '>
            <div className="logobox"><h2>EightShop</h2></div>


            <div className="navlink">
                <Link to="/" className='navurl'>Home</Link>
                <Link to="/*" className='navurl'>Categories</Link>
                <Link to="/register" className='navurl'>Register</Link>

                <button className='navBtn'>  <Link to="/login" className='navurl'>Login</Link> </button>
                <button>  <Link to="/*" className='navurl'>Cart</Link>   </button>
            </div>


        </div >
    )
}

export default Header