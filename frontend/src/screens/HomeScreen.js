import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { productList } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = () => {
    const dispatch = useDispatch()

    const productlist = useSelector(state => state.productList)
    const { products, loading, error } = productlist;

    useEffect(() => {  
        dispatch(productList())
    }, [])

    return (
        loading? <Loader />: error? <Message variant="danger">{error}</Message>:
        <>
            <Row>
                {products.map((product, i) =>
                    <Col sm={12} md={6} lg={4} xl={3} key={i} >
                        <Product product={product} />
                    </Col>
                )}
            </Row>
        </>
    )
}

export default HomeScreen
