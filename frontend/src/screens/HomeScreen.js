import React from 'react'
import { Row, Col } from 'react-bootstrap'
import products from '../products'
import Product from '../components/Product'

const HomeScreen = () => {
    return (
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
