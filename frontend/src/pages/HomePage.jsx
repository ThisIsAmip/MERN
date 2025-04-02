import { Col, Row, Flex, Button, Image, Card, Typography, message } from 'antd';
import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import { ProductCard } from '../components/ProductCard';
const { Text, Title, Paragraph } = Typography;

const HomePage = () => {

  //Styles

  const cardStyle = {
    width: "100%",
    overflow: 'hidden',
  };

  //Functions, variables, etc.

  const { fetchProducts, products } = useProductStore();
  const [messageApi, contextHolder] = message.useMessage();
  const showToast = (type, content) => {
    messageApi.open({
        type,
        content,
        duration: 2,
    });
}
  const fetchData = useCallback(async () => {
    console.log('Fetching products...');
    await fetchProducts();
    console.log('Products fetched:', products);
  }, [fetchProducts]);

  useEffect(() => {
    fetchData();
  }, [fetchProducts]);


  return (
    <>
    {contextHolder}
      <Flex
        gap="middle"
        align='center'
        style={{ height: '100%', marginTop: '5em' }}
        vertical
      >
        <div

          style={{
            width: '100%',
            maxWidth: '600px',

          }}>
          <Title style={{ textAlign: 'center', margin: 0 }}>Home Page</Title>
        </div>
        {products.length === 0 && (
          <h2 >No Products found ;-; {" "}
            <Link to="/create">
              <span >Create a Product</span>
            </Link>
          </h2>
        )}

        <Row
          justify={'start'}
          gutter={[16, 16]}
          style={{
            width: '100%',
            padding: '2em',
          }}
        >
          {products.map((product) => (
            <Col
              key={product._id}
              lg={6} md={8} sm={12} xs={24}
              style={{ maxHeight: '500px', overflow: 'hidden' }}
            >
              <ProductCard product={product} showToast={showToast}/>
            </Col>
          ))}
        </Row>
      </Flex>

    </>
  );

}

export default HomePage