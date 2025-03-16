import { Flex, Form, Input, Button, InputNumber, message } from 'antd';
import { useState } from 'react'
import { useProductStore } from '../store/product';
import { set } from 'mongoose';
import axios from 'axios';

const CreatePage = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    countInStock: 0,
    imageUrl: '',
  });

  const successToast = () => {
    messageApi.open({
      type: 'success',
      content: 'Product created successfully',
    });
  };

  const errorToast = () => {
    messageApi.open({
      type: 'error',
      content: 'Product creation failed',
    });
  };


  const { createProduct } = useProductStore()
  const onFinish = async (values) => {
    setNewProduct(newProduct);
    const { success, message } = await createProduct(values);
    if (success == "success") {
      successToast();
    } else {
      errorToast();
    }
    console.log("newProduct: ", values);
    console.log("success: ", success, "message: ", message);
  };
  const testing = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    console.log("Request URL:", res); // Check where it's actually going
  }
  return (
    <>
      {contextHolder}
      <Flex
        gap="middle"
        justify='center'
        align='center'
        style={{ height: '100vh' }}

      >
        <div

          style={{
            backgroundColor: '#efefef',
            width: '100%',
            maxWidth: '600px',
            padding: '2em',
            border: '1px solid #ddd',
            borderRadius: '10px'
          }}>
          <p style={{ fontSize: '2.5em', color: 'black' }}>Create new Product</p>
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
              <Input size='large' />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please input the product price!' }]}
            >
              <InputNumber min={0} size='large' />
            </Form.Item>
            <Form.Item
              label="Product Description"
              name="description"
              rules={[{ required: true, message: 'Please input the product description!' }]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item
              label="Count In Stock"
              name="countInStock"
              rules={[{ required: false }]}
              initialValue={0}
            >
              <InputNumber min={0} size='large' />
            </Form.Item>
            <Form.Item
              label="Image URL"
              name="imageUrl"
              rules={[{ required: true, message: 'Please input the product Image URL!' }]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" size='large'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Button type="primary" onClick={testing}>
          test this bitch
        </Button>
      </Flex>
    </>

  );
}

export default CreatePage