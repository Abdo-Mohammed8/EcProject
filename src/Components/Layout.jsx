import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { Helmet } from 'react-helmet'
import logo from './../assets/favicon-32x32.png'


export default function Layout() {
  return (
    <>
    <Helmet>
       <meta charSet="utf-8" />
       <title>Fresh Cart</title>
       <link rel="shortcut icon" href={logo} type="image/x-icon" />
       <meta name="description" content="Shop fresh groceries, fruits, vegetables, and daily essentials online with Fresh Cart. Enjoy fast delivery, affordable prices, and a seamless shopping experience. Freshness guaranteed!" />
    </Helmet>
    <Navbar/>
    <div className='pt-20'>
    <Outlet/>
    </div>
    </>
  )
}
