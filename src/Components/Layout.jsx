import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { Helmet } from 'react-helmet'
import logo from './../assets/favicon-32x32.png'


export default function Layout() {
  return (
    <>
    <Helmet>
       <title>Fresh Cart</title>
       <link rel="shortcut icon" href={logo} type="image/x-icon" />
    </Helmet>
    <Navbar/>
    <div className='pt-20'>
    <Outlet/>
    </div>
    </>
  )
}
