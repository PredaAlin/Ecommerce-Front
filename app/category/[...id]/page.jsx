"use client";

import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5rem;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 1.5rem;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: #444;
  select {
    background-color: transparent;
    border: 0;
    font-size: inherit;
    color: #444;
  }
`;

const CategoryPage = ({ params }) => {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [filtersValues, setFiltersValues] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sort, setSort] = useState("_id-desc");
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);
  console.log(filtersValues);

  const { id } = params;

  useEffect(() => {
    axios
      .get(`/api/category?id=${id}`)
      .then((response) => {
        console.log(response.data);
        setCategory(response.data);
        setFiltersValues(
          response.data?.properties?.map((p) => ({
            name: p.name,
            value: "all",
          })) ?? []
        );
      })
      .catch((error) => {
        console.log("error displayinh category", error);
      });

    axios
      .get(`/api/categories/subproducts?id=${id}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setNewProducts(response.data);
      })
      .catch((error) => {
        console.log("error displayinh category", error);
      });

    axios
      .get(`/api/categories/subcategories?id=${id}`)
      .then((response) => {
        console.log(response.data);
        setSubCategories(response.data);
      })
      .catch((error) => {
        console.error("Error displaying product:", error);
      });
  }, []);

  useEffect(() => {
    if (!filtersChanged) {
      return;
    }

    setLoadingProducts(true);
    const catIds = [category?._id, ...(subCategories?.map((c) => c._id) || [])];
    const params = new URLSearchParams();
    params.set("categories", catIds.join(","));
    params.set("sort", sort);
    filtersValues.forEach((f) => {
      if (f.value !== "all") {
        params.set(f.name, f.value);
      }
    });
    const url = "/api/categories/products?" + params.toString();
    axios.get(url).then((response) => {
      setNewProducts(response.data);
     
        setLoadingProducts(false);
    
    });
  }, [filtersValues, sort, filtersChanged]);

  function handleFilterChange(filterName, filterValue) {
    setFiltersValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
    setFiltersChanged(true);
  }
  return (
    <Center>
      <CategoryHeader>
        <h1>{category?.name}</h1>
        <FiltersWrapper>
          {category?.properties?.map((prop) => (
            <Filter key={prop.name}>
              <span>{prop.name}:</span>
              <select
                onChange={(ev) =>
                  handleFilterChange(prop.name, ev.target.value)
                }
                value={filtersValues?.find((f) => f.name === prop.name).value}
              >
                <option value="all">All</option>
                {prop.values.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </Filter>
          ))}
          <Filter>
            <span>Sort:</span>
            <select
              value={sort}
              onChange={(ev) => {
                setSort(ev.target.value);
                setFiltersChanged(true);
              }}
            >
              <option value="price-asc">price, lowest first</option>
              <option value="price-desc">price, highest first</option>
              <option value="_id-desc">Newest first</option>
              <option value="_id-asc">Oldest first</option>
            </select>
          </Filter>
        </FiltersWrapper>
      </CategoryHeader>
      {loadingProducts && (<Spinner fullWidth />)}
      {!loadingProducts && (
        <div>
          {newProducts.length > 0 && (
            <ProductsGrid products={newProducts}></ProductsGrid>
          )}
          {newProducts.length === 0 && (
            <div>Sorry, no products found</div>
          )}
        </div>
      )}
    </Center>
  );
};

export default CategoryPage;
