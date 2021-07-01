import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Product from '../components/Product'

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {  
        const fetchProducts = async () => {
            var {data} = await axios.get("/api/products")
            setProducts(data)
        }

        fetchProducts()
    }, [])

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
