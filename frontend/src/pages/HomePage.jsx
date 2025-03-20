import { Col, Row, Flex, Image } from 'antd';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';

const HomePage = () => {

  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();

  }, [fetchProducts]);
  console.log(products);


  return (
    <>
      <Flex
        gap="middle"
        align='center'
        style={{ height: '100vh', marginTop: '5em' }}
        vertical
      >
        <div

          style={{
            width: '100%',
            maxWidth: '600px',
            padding: '2em',

          }}>
          <h1 style={{ color: 'black', textAlign: 'center', }}>Home Page</h1>
        </div>
        <h2 >No Products found ;-; {" "}
          <Link to="/create">
            <span >Create a Product</span>
          </Link>
        </h2>
        <Row
          justify={'start'}
          gutter={[16, 16]}
          style={{
            width: '100%',
            padding: '2em',
          }}
        >


          <Col lg={6} md={8} sm={12} xs={24}
          style={{
            overflow: 'hidden',
          }}
          >
            <Flex
              vertical
              justify='center'
              align='center'
              style={{
                backgroundColor: 'white',

                borderRadius: '10px'
              }}>
              <Image
                style={{width: '100%'}}
                src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <h1>Product 1</h1>
              <p style={{ fontSize: '1.2em' }}>Product 1</p>

            </Flex>
          </Col>


        </Row>
      </Flex>
    </>
  );
}

export default HomePage