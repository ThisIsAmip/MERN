import { Col, Row, Flex, Button, Image, Card, Typography } from 'antd';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import { ProductCard } from '../components/ProductCard';
const { Text, Title, Paragraph } = Typography;

const HomePage = () => {
  const [childData, setChildData] = useState(null);
  const handleChildData = (data) => {
    setChildData(data);
  }
  //Styles

  const cardStyle = {
    width: "100%",
    overflow: 'hidden',
  };

  //Functions, variables, etc.

  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching products...');
      await fetchProducts();
      console.log('Products after fetch:', products);
    };
    fetchData();
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
              lg={6} md={8} sm={12} xs={24}
            >
              <ProductCard key={product._id} product={product} />
            </Col>
          ))}


        </Row>
      </Flex>
      <ChildComponent childDataFunction={handleChildData} />
      <p>Child Data: {childData}</p>
    </>
  );

}
const ChildComponent = (props) => {
  return (
    <>
      <input type="text" onChange={(e) => props.childDataFunction(e.target.value)} />
    </>
  )
}
export default HomePage