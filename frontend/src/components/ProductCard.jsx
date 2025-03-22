import { Button, Flex, Image, Card, Typography, message } from 'antd'
import React from 'react'
import { useProductStore } from '../store/product';
const { Text, Title, Paragraph } = Typography;

export const ProductCard = ({ product }) => {

    //Styles

    const cardStyle = {
        width: "100%",
        overflow: 'hidden',
    };

    //Functions, variables, etc.
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
            content: 'Product creation failed',
        });
    };

    const { deleteProduct } = useProductStore();
    const handleDeleteProduct = async (id) => {
        const { success, message } = await deleteProduct(id);
    }

    return (
        <>
            {contextHolder}
            <Card
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
                        style={{ width: '100%' }}
                        src={product.imageUrl}
                        alt={product.name}
                    />
                    <Flex vertical style={{ padding: '1em', width: "100%" }}>
                        <Typography.Title level={3} style={{ margin: "0px 0px 10px 0px" }}>
                            {product.name}
                        </Typography.Title>
                        <Paragraph ellipsis={{ rows: 2 }} style={{ width: "100%", fontSize: '1.2em', }}>
                            {product.description}
                        </Paragraph>

                        <Flex justify='space-between' align='center' style={{ width: '100%' }} >
                            <Text strong >Price: {product.price}</Text>
                            <Text strong >In-stock: {product.countInStock}</Text>
                            <Flex gap='small'>
                                <Button color="primary" variant="outlined">View & Edit</Button>
                                <Button color="danger" variant="solid" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        </>
    )
}
