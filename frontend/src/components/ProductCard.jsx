import { Button, Flex, Image, Card, Typography, message, Modal, Form, Input, InputNumber } from 'antd'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useProductStore } from '../store/product';
const { Text, Title, Paragraph } = Typography;

export const ProductCard = ({ product, showToast }) => {

    //Styles

    const cardStyle = {
        width: "100%",
        overflow: 'hidden',
    };

    //Functions, variables, etc.
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();


    const { deleteProduct, updateProduct } = useProductStore();


    const handleDeleteProduct = useCallback(async (id) => {
        try {
            const { success, message: responseMessage } = await deleteProduct(id);
            showToast(success == "success" ? "success" : "error",
                success == "success" ? "Product deleted successfully!" : `Product deletion failed: ${responseMessage}`
            );
        } catch (error) {
            showToast("error", "Product deletion failed: An error occurred while deleting the product. " + error.message);
        }
    }, [deleteProduct]);


    const handleUpdateProduct = useCallback(async () => {
        const values = form.getFieldsValue();
        try {
            const { success, message: responseMessage } = await updateProduct(product._id, values);
            showToast(success == "success" ? "success" : "error",
                success == "success" ? "Product updated successfully!" : `Product update failed: ${responseMessage}`
            );
            setModalOpen(false);
        } catch (error) {
            showToast("error", "Product update failed: An error occurred while updating the product. " + error.message);
        }

    }, [updateProduct, product._id, form]);

    return (
        <>
            <Modal
                centered
                open={modalOpen}
                okText="Update Product"
                cancelText="Cancel"
                onOk={() => handleUpdateProduct()}
                onCancel={() => setModalOpen(false)}
            >

                <Form
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        backgroundColor: '#fff',
                        width: '100%',
                        maxWidth: '600px',
                        padding: '2em'
                    }}
                    initialValues={{
                        remember: true,
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        countInStock: product.countInStock,
                        imageUrl: product.imageUrl,
                    }}
                    labelAlign="left"
                    labelWrap
                    form={form}
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
                        <Input.TextArea size='large' />
                    </Form.Item>
                    <Form.Item
                        label="Count In Stock"
                        name="countInStock"
                        rules={[{ required: false }]}

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
                </Form>
            </Modal>
            <Card
                style={cardStyle}
                styles={{
                    body: {
                        padding: 0,
                        height: '100%',
                    },
                }}
            >
                <Flex
                    vertical
                    justify='center'
                    align='center'
                >
                    <Image
                        style={{ width: '100%' }}
                        src={product.imageUrl}
                        alt={product.name}
                    />
                    <Flex vertical style={{ padding: '1em', width: "100%" }}>
                        <Typography.Title level={3} style={{ margin: "0px 0px 10px 0px" }}>
                            {product.name}
                        </Typography.Title>
                        <Paragraph ellipsis={{ rows: 1 }} style={{ width: "100%", fontSize: '1.2em', }}>
                            {product.description}
                        </Paragraph>

                        <Flex justify='space-between' align='center' style={{ width: '100%' }} >
                            <Text strong >Price: {product.price}</Text>
                            <Text strong >In-stock: {product.countInStock}</Text>
                            <Flex gap='small'>
                                <Button color="primary" variant="outlined" onClick={() => setModalOpen(true)}>View & Edit</Button>
                                <Button color="danger" variant="solid" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        </>
    )
}
