"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Center from './Center';
import ProductBox from './ProductBox';
import ProductsGrid from './ProductsGrid';




const Title = styled.h2`
font-size: 2rem;
margin:30px 0 20px;
font-weight: 500;
`;
const NewProducts = () => {

    const [newProducts, setNewProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        axios.get("/api/newproducts").then((response) => {
            
            console.log(response.data)
            setNewProducts(response.data)
            setLoading(false)
        }).catch((error) =>{
            console.error("Error displaying product:", error)
        });
    },[])
  return (
    <Center>
        <Title>New Arrivals</Title>
        <ProductsGrid products = {newProducts}>
       
    </ProductsGrid>
    </Center>
    
  )
}

export default NewProducts