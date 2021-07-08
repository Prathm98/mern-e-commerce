import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { userLogin } from '../actions/userActions'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch()

    const userLoginInfo = useSelector(state => state.userLogin)
    const { error, userInfo, loading } = userLoginInfo

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userLogin(email, password))
    }

    return (
        <FormContainer>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
                <h1>Sign In</h1>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder="Enter your email" value={email}
                        onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder="Enter your password" value={password}
                        onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button type="submit" variant="primary">Sign In</Button>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
