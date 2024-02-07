"use client";

import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import ProductImages from "@/components/ProductImages";
import WhiteBox from "@/components/WhiteBox";
import CartIcon from "@/components/icons/CartIcon";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5rem;
`;

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;
@media screen and (min-width: 768px){
    grid-template-columns: 0.8fr 1.2fr;
}
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;
const ProductPage = ({ params }) => {
  const { addProduct } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const { id } = params;
  console.log("id:" + id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/allproducts?id=${id}`);
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  return (
    <div>
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product?.images}></ProductImages>
          </WhiteBox>
          <div>
            <Title>{product?.title}</Title>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
              illum magnam, quae perferendis distinctio provident? Qui quidem
              distinctio minima. Aliquam voluptatibus enim placeat quibusdam sed
              quam similique unde ratione cum?
            </p>
            <PriceRow>
              <Price>$ {product?.price}</Price>
              <div>
            
                <Button $primary="true" onClick={() => addProduct(product._id)}>
               
                  <CartIcon /> Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </div>
  );
};

export default ProductPage;
