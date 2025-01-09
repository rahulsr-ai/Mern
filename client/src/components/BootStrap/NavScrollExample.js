

import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { useSearch } from '../../context/SearchContext';





import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function NavScrollExample() {



    const navigate = useNavigate()

    const [auth, setAuth] = useAuth()
    const [search, setsearch] = useSearch()


    // function to handle search product
    const findProduct = async (e) => {
        e.preventDefault()
        try {
            console.log(search);
            const { data } = await axios.get(`/api/v1/auth/product/search-product/${search.keyword}`)
            console.log(data);

            setsearch({
                ...search,
                products: data
            })
            navigate("/search")

        } catch (error) {
            console.log("error while sending request to backend to fetch product");
            console.log(error);

        }

    }




    // function to handle the login logout feature 
    function logout() {
        setAuth({
            ...auth,
            user: null, token: null

        })



        localStorage.removeItem("auth")
        toast.success("logged out successfuly")
    }


    return (
        <Navbar expand="lg" className="bg-body-tertiary">

            <Container fluid>

                <Navbar.Brand href="#"> EightShop </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />





                <Navbar.Collapse id="navbarScroll">

                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >


                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2"> Categories </Nav.Link>
                        <Nav.Link href="">  {!auth.user && <Link to="/register"> Register </Link>} </Nav.Link>



                        {
                            !auth?.token ? (
                                <Link to="/login"> Login </Link>

                            ) : (

                                <NavDropdown title={auth?.user?.role === 1 ? "admin" : "user"} id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>

                                </NavDropdown>)
                        }


                    </Nav>

                    {/* search box */}
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={search.keyword} onChange={(e) => setsearch({ ...search, keyword: e.target.value })}
                        />

                        <Button variant="outline-success" onClick={findProduct} >Search</Button>
                    </Form>




                </Navbar.Collapse>

            </Container>

        </Navbar>
    );
}

export default NavScrollExample

