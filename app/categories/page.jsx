"use client";
import Center from "@/components/Center";
import ProductWhiteBox from "@/components/ProductBox";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
const Title = styled.h1`
  font-size: 1.5rem;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const CategoryTitle = styled.div`
display:flex;
  margin-top: 10px;
  margin-bottom: 0;
  align-items:center;
  gap:10px;
  h2{
    margin-bottom: 10px;
    margin-top:10px;
  }
  a{
    color:#555;
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`

background-color: #ddd;
height:160px;
border-radius: 10px;
align-items: center;
display: flex;
justify-content:center;
color: #555;
text-decoration:none;
`
const CategoriesPage = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  useEffect(() => {
    axios
      .get("/api/categories/maincategories")
      .then((response) => {
        console.log(response.data);
        setMainCategories(response.data);
      })
      .catch((error) => {
        console.error("Error displaying product:", error);
      });

    axios
      .get("/api/categories/categoriesproducts")
      .then((response) => {
        console.log(response.data);
        setProductCategories(response.data);
      })
      .catch((error) => {
        console.error("Error displaying product:", error);
      });

      
  }, []);
  return (
    <Center>
      {mainCategories.map((category) => (
        <CategoryWrapper>
          <CategoryTitle>
            <h2>{category.name}</h2>
            <div>
              <Link href={"/category/" + category._id}>Show All </Link>
            </div>
          </CategoryTitle>

          <CategoryGrid>
            {productCategories[category._id]?.map((p) => (
              <ProductWhiteBox product={p} />
            ))}
            <ShowAllSquare href={"/category/" + category._id}>Show All </ShowAllSquare>
          </CategoryGrid>
        </CategoryWrapper>
      ))}
    </Center>
  );
};

export default CategoriesPage;
