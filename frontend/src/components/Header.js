import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { userLogout } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()

    const userLoginInfo = useSelector(state => state.userLogin)
    const { userInfo } = userLoginInfo

    const logoutHandler = () => {
        dispatch(userLogout())
    }
    
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand href="/">MyShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart'></i> Cart
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo?
                            <NavDropdown title={userInfo.name}>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        <i className='fas fa-user'></i> Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    <i className="fas fa-sign-out-alt"></i> Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                            :<LinkContainer to="/login">
                                <Nav.Link>
                                    <i className='fas fa-user'></i> Sign In
                                </Nav.Link>
                            </LinkContainer>
                            }                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header