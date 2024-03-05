import React, { useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    max-width: 100%;
    max-height: 100px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
gap:5px;
  display: block
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  @media screen and (min-width: 768px){
    display:flex;
  }
  
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-align: right;
  @media screen and (min-width: 768px){
    font-size: 1.2rem;
  font-weight: 600;
  text-align:left;
  }
`;

const ProductWhiteBox = ({ product }) => {
  const { addProduct } = useContext(CartContext);
  const url = "/products/" + product?._id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={product?.images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{product?.title}</Title>
        <PriceRow>
          <Price>${product?.price}</Price>

          <Button block onClick={() => addProduct(product._id)} $primary="true" outline>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductWhiteBox;
