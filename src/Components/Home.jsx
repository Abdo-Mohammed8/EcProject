import React from 'react'
import Header from './HomeComponents/Header'

import Products from './Products'
import CategoriesSlider from './HomeComponents/CategoriesSlider'
import { Helmet } from 'react-helmet'

export default function Home() {
  return (<>
  
        
    <Header/>
    <CategoriesSlider/>
    <Products/>
    </>
  
  )
}
