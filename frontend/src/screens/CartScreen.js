import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, FormControl, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { Link } from 'react-router-dom'


const CartScreen = ({ history, location, match }) => {
    const dispatch = useDispatch()

    const {cartItems} = useSelector(state => state.cart)
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split("=")[1]) > 0? Number(location.search.split("=")[1]): 1: 1

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }        
    }, [dispatch, productId, qty])

    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        history.push("/login?redirect=shipping")
    }

    return (
        <Row>
            <Col md="8">
                <h1>Shopping Cart</h1>
                {cartItems.length == 0? 
                <Message>Your cart is empty <Link to="/">Go Back</Link></Message>: 
                <ListGroup variant="flush">
                    {cartItems.map(i => <ListGroup.Item key={i.id}>
                        <Row>
                            <Col md="2">
                                <Image src={i.image} alt={i.name} fluid rounded />
                            </Col>
                            <Col md="3">
                                <Link to={`/product/${i.id}`}>{i.name}</Link>
                            </Col>
                            <Col md="2">
                                ${i.price}
                            </Col>
                            <Col md="3">
                                <FormControl as="select" value={i.qty} onChange={e => dispatch(addToCart(i.id, e.target.value))}>
                                {[...Array(i.countInStock > 10? 10: i.countInStock).keys()].map(x => (
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                ))}
                                </FormControl>
                            </Col>                            
                            <Col md="2">
                                <Button type="button" variant="light" onClick={() => removeFromCartHandler(i.id)}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>)}    
                </ListGroup>}
            </Col>
            <Col md="4">
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + Number(item.qty) * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className="btn-block" type="button" disabled={cartItems.length === 0}
                                onClick={checkOutHandler}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>            
        </Row>
    )
}

export default CartScreen
