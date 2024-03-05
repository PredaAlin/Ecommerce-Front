"use client"

import React from 'react'
import styled from 'styled-components';

const StyledTitle = styled.h1`
    font-size: 1.5em;
`;
const Title = (props) => {
  return (
    <StyledTitle>{...props}</StyledTitle>
  )
}

export default Title