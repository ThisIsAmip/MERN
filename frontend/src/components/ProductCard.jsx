import { Flex, Image } from 'antd'
import React from 'react'

export const ProductCard = ({ product }) => {
    return (
        <>
            <Flex>
                <Image
                    width={200}
                    src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <h1>Product 1</h1>
            </Flex>
        </>
    )
}
