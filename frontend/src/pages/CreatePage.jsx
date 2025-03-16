import { Flex, Form, Input, Button, InputNumber } from 'antd';
import { useState } from 'react'
import { useProductStore } from '../store/product';
import { set } from 'mongoose';
import axios from 'axios';

const CreatePage = () => {
  const [form] = Form.useForm();
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    countInStock: 0,
    imageUrl: '',
  });
  const {createProduct} = useProductStore()
  const onFinish = async (values) => {
    setNewProduct(newProduct);
    const {success, message} = await createProduct(values);
    console.log("newProduct: ", values);
    console.log("success: ", success, "message: ", message);
  };
  const testing = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    console.log("Request URL:", res); // Check where it's actually going
  }
  return (
    <Flex
      gap="middle"
      justify='center'
      align='center'
      style={{ height: '100vh'}}

    >
      <div 

      style={{ 
        backgroundColor: '#efefef',
        width: '100%', 
        maxWidth: '600px', 
        padding: '2em', 
        border: '1px solid #ddd',
        borderRadius: '10px' }}>
        <p style={{ fontSize: '2.5em', color:'black' }}>Create new Product</p>
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          labelAlign="left"
          labelWrap
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: 'Please input the product name!' }]}
          >
            <Input  />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input the product price!' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Product Description"
            name="description"
            rules={[{ required: true, message: 'Please input the product description!' }]}
          >
            <Input  />
          </Form.Item>
          <Form.Item
            label="Count In Stock"
            name="countInStock"
            rules={[{ required: true, message: 'Please input the count in stock!' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="Image URL"
            name="imageUrl"
            rules={[{ required: true, message: 'Please input the product image URL!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Button type="primary" onClick={testing}>
              test this bitch
            </Button>
    </Flex>
  );
}

export default CreatePage