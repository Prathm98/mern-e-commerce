import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, FormControl } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader' 

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { error, product, loading } = productDetails

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
    }, [match, dispatch]);
    
    const addToCartHandler = () => {
        history.push(`/cart/${product._id}?qty=${qty}`)
    }

    return (
        product === null ? 
        <div>Loading</div>:
        <>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
            {loading? <Loader />: error? <Message variant="danger">{error}</Message>:
            <Row>
                <Col md={6}>
                    <Image src={product.image} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={parseFloat(product.rating)} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>${product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{product.countInStock > 0? 'In Stock': 'Out of Stock'}</Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <FormControl as="select" value={qty} onChange={e => setQty(e.target.value)}>
                                        {[...Array(product.countInStock > 10? 10: product.countInStock).keys()].map(x => (
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        ))}
                                        </FormControl>
                                    </Col>
                                </Row>
                            </ListGroup.Item>}
                            <ListGroup.Item>
                                <Button disabled={product.countInStock < 1} className="btn-block" type="button"
                                    onClick={addToCartHandler}>
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>}
        </>
    )
}

export default ProductScreen
