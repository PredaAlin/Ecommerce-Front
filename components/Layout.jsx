"use client"

import React from 'react'


import Header from './Header';
import GlobalStyles from '@/app/styles/GlobaslStyles';


const Layout = ({children}) => {
  return (
    <div>
      {/* <GlobalStyles />  */}
        <Header/>
        
        {children}
    </div>
   
  )
}

export default Layout