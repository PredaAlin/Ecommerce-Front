"use client";

import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Input from "@/components/Input";
import Table from "@/components/table";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  margin: 50px;
  @media screen and (min-width: 768px){
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 80px;
    max-height: 80px;
  }
  @media screen and (min-width: 768px){
    padding: 10px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const StyledUnderline = styled.tr`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, setCartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(()=>{
    if (typeof window === 'undefined'){
      return
    }
    
    if (window.location.href.includes('success')){
      setIsSuccess(true);
      setCartProducts([]);
      console.log("cartp:"+cartProducts.length);
    }
  },[])

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  function finishCheckout(
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    products
  ) {
    const data = {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    };
    console.log(data);
    axios.post("api/checkout", data).then((response) => {
      window.location= response.data
    });
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess){
    return(

      <>
      <Center>
        <ColumnsWrapper>
        <Box>
          <h1>Thanks for your order!</h1>
          <p>We will email you when your oder will be sent.</p>
        </Box>
        </ColumnsWrapper>
      </Center>
      
      
      </>
    )
    }
  return (
    <div>
       <Center>
      <ColumnsWrapper>
     
        <Box>
          <h2>Cart</h2>
          {!cartProducts?.length && <div>Your cart is empty</div>}
          {products?.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr>
                    <ProductInfoCell>
                      <ProductImageBox>
                        {" "}
                        <img src={product.images[0]} alt="" />
                      </ProductImageBox>{" "}
                      {product.title}
                    </ProductInfoCell>
                    <ProductInfoCell>
                      <Button onClick={() => lessOfThisProduct(product._id)}>
                        -
                      </Button>
                      <QuantityLabel>
                        {cartProducts.filter((id) => id === product._id).length}
                      </QuantityLabel>

                      <Button onClick={() => moreOfThisProduct(product._id)}>
                        +
                      </Button>
                    </ProductInfoCell>
                    <ProductInfoCell>
                      $
                      {product.price *
                        cartProducts.filter((id) => id === product._id).length}
                    </ProductInfoCell>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>${total}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Box>
        {!!cartProducts?.length > 0 && (
          <Box>
            <h2>Order information</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                finishCheckout(
                  name,
                  email,
                  city,
                  postalCode,
                  streetAddress,
                  country,
                  cartProducts
                );
              }}
            >
              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </CityHolder>

              <Input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAdress"
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <input
                type="hidden"
                name="products"
                value={cartProducts.join(",")}
              />
              <Button black block type="submit">
                Continue to payment
              </Button>
            </form>
          </Box>
        )}
      </ColumnsWrapper>
      </Center>
    </div>
  );
};

export default CartPage;
