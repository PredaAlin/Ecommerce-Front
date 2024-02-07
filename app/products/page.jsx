"use client"

import Center from '@/components/Center';
import ProductsGrid from '@/components/ProductsGrid';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const Title = styled.h1`
    font-size: 1.5em;
`;

const Products = () => {

    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get("/api/allproducts").then((response) => {
            console.log(response.data)
            setProducts(response.data)
        }).catch((error) =>{
            console.error("Error displaying product:", error)
        });
    },[])
  return (
    <div>
        <Center>
            <Title>All Products</Title>
            <ProductsGrid products={products}></ProductsGrid>
        </Center>
       
    </div>
    
  )
}

export default Products