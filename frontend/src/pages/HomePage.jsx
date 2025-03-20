import { Col, Row, Flex, Button, Image, Card, Typography } from 'antd';
import React, { useEffect } from 'react'
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
        {products.length === 0 && (
          <h2 >No Products found ;-; {" "}
            <Link to="/create">
              <span >Create a Product</span>
            </Link>
          </h2>
        )}
        <div

          style={{
            width: '100%',
            maxWidth: '600px',

          }}>
          <Title style={{textAlign: 'center', margin: 0}}>Home Page</Title>
        </div>
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


          {/* <Card

              style={cardStyle}
              styles={{
                body: {
                  padding: 0,
                },
              }}
            >
              <Flex
                vertical
                justify='center'
                align='center'
              >
                <Image
                  style={{ width: '100%', }}
                  src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <Flex vertical style={{ padding: '1em' }}>
                  <Title level={3} style={{ margin: "0px 0px 10px 0px" }}>
                    A Very Long Product Name
                  </Title>
                  <Paragraph ellipsis={{ rows: 2 }} style={{ width: "100%", fontSize: '1.2em' }}>
                    Lorem ipsum dolor, sit amet adipisicing elit. Non quisquam reiciendis voluptatem accusantium, incidunt distinctio debitis labore, vero sed placeat, iste dignissimos quas animi molestiae beatae dolor adipisci fuga quidem?
                  </Paragraph>

                  <Flex justify='space-between' align='center' style={{ width: '100%' }} >
                    <Text strong >Price: $10000000</Text>
                    <Text strong >In-stock: 10000000</Text>
                    <Flex gap='small'>
                      <Button color="primary" variant="outlined">View & Edit</Button>
                      <Button color="danger" variant="solid">Delete</Button>
                    </Flex>
                  </Flex>
                </Flex>

              </Flex>
            </Card> */}



        </Row>
      </Flex>
    </>
  );
}

export default HomePage