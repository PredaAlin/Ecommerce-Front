"use client";

import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import styled from "styled-components";

const GlobalStyle = styled.div`
background-color: #f0f0f0
`;

export default function Home() {
  

  return (
    <div>
        <Featured/>
      <NewProducts/>
    </div>
    
    
    
  );
}
