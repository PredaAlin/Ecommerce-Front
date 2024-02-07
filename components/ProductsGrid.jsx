import styled from "styled-components";
import ProductWhiteBox from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({ products }) {
  return (
    <StyledProductsGrid>
      {products.length > 0 &&
        products.map((product) => <ProductWhiteBox key={product._id} product={product} />)}
    </StyledProductsGrid>
  );
}
