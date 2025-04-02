import { Flex, Form, Input, Button, InputNumber, message, Table } from 'antd';
import { use, useState, useEffect } from 'react'
import { useProductStore } from '../store/product';
import { model, set } from 'mongoose';
import axios from 'axios';
import ProductModel from '../../../backend/models/product.model';
import ProductViewModel from '../models/ProductViewModels';

const CreatePage = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const successToast = () => {
    messageApi.open({
      type: 'success',
      content: 'Product created successfully',
    });
  };

  const errorToast = () => {
    messageApi.open({
      type: 'error',
      content: 'Create product failed',
    });
  };

  const { products, createProduct } = useProductStore();
  const onFinish = async (values) => {
    const { success, message } = await createProduct(values);
    if (success == "success") {
      successToast();
    } else {
      errorToast();
    }
  };
  return (
    <>
      {contextHolder}
      <Flex
        gap="middle"
        align='center'
        vertical
        style={{ height: '100vh', marginTop: '5em' }}

      >
        <div>
          <p style={{ fontSize: '2.5em', color: 'black', textAlign: 'center', }}>Create new Product</p>
        </div>
        <Form

          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            backgroundColor: '#efefef',
            width: '100%',
            maxWidth: '600px',
            padding: '2em',
            border: '1px solid #ddd',
            borderRadius: '10px',
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
      </Flex>


    </>

  );
}

export default CreatePage