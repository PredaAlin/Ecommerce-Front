"use client"

import {css, createGlobalStyle } from "styled-components"

const styles = css`
  body {
   margin:0;
   padding:0;
   background-color: #eee;
  }
  
`;

const GlobalStyles = createGlobalStyle`
${styles}
`

export default GlobalStyles