import React, { useContext } from 'react'
import logo from './../assets/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { userToken } from '../Context/UserToken';
import useCart, { getCart } from '../hooks/useCart';



export default function Navbar() {


  let { isLogin, setLogin } = useContext(userToken);

  let navigate = useNavigate();


  let { data:cartNum , isLoading:cartNumIsloading} = useCart(getCart)



 
  function handleLogout() {
    localStorage.removeItem('userToken');
    setLogin(null);
    navigate('/');
    

  }
  

  return (

    <nav className="bg-gray-50 w-full  z-50  py-5 border-gray-200 dark:bg-gray-900 fixed">
      <div className="container">
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center ">

          <a href="#" className="flex items-center space-x-3 lg:pr-3   rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Flowbite Logo" />
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-green-color/30 focus:outline-none focus:bg-green-color/30 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>


          <div className="hidden w-full lg:flex lg:justify-between " id="navbar-default">
            <ul className="font-medium flex flex-col items-center  p-4 lg:p-0 mt-2 Lg:me-10  bg-gray-50 lg:flex-row lg:space-x-4 rtl:space-x-reverse lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to="/" className="block py-2 px-3 text-gray-800  text-center  lg:p-0 dark:text-white lg:dark:text-white hover:text-green-color hover:scale-110 transition-all">Home</NavLink>
              </li>
              {isLogin && <li>
                <NavLink to="/cart" className="block py-2 px-3 text-gray-800 text-center    lg:p-0 dark:text-white lg:dark:text-white hover:text-green-color hover:scale-110 transition-all">Cart</NavLink>
              </li>}
              <li>
                <NavLink to="/products" className="block py-2 px-3 text-gray-800 text-center    lg:p-0 dark:text-white lg:dark:text-white hover:text-green-color hover:scale-110 transition-all">Products</NavLink>
              </li>
              <li>
                <NavLink to="/categories" className="block py-2 px-3 text-gray-800 text-center    lg:p-0 dark:text-white lg:dark:text-white hover:text-green-color hover:scale-110 transition-all">Categories</NavLink>
              </li>
              <li>
                <NavLink to="/brands" className="block py-2 px-3 text-gray-800 text-center    lg:p-0 dark:text-white lg:dark:text-white hover:text-green-color hover:scale-110 transition-all">Brands</NavLink>
              </li>
              {isLogin && <li>
                <NavLink to="/wishlist" className="block py-2 px-3 text-gray-800 text-center    lg:p-0 dark:text-white lg:dark:text-white hover:text-green-color hover:scale-110 transition-all">Wishlist</NavLink>
              </li>}
              {isLogin && <li>
                <NavLink to="/allorders" className="block py-2 px-3 text-gray-800 text-center    lg:p-0 dark:text-white lg:dark:text-white hover:text-green-color hover:scale-110 transition-all">Orders</NavLink>
              </li>}
            </ul>
            <ul className="font-medium flex flex-col justify-center items-center gap-y-5 p-4 lg:p-0  bg-gray-50 lg:flex-row lg:space-x-4 rtl:space-x-reverse lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">


              {isLogin && <li className='flex space-x-8 justify-between'>

                 <NavLink to="/cart" className="lg:block py-2 px-3  text-black relative   lg:p-0 dark:text-black lg:dark:text-white hover:text-green-color hover:scale-110 transition-all "><i className="fa-solid fa-cart-shopping fa-xl"></i><span className='absolute -top-4 -right-5 bg-green-color px-2 rounded-full text-white text-xs font-bold'>{cartNumIsloading ? <i className='fa-solid fa-spinner animate-spin '></i> : cartNum?.numOfCartItems}</span> </NavLink>

              </li>}
             



              <li className='flex gap-3 justify-center  '>

                <a href="#" className="lg:block py-2 px-3 text-black   lg:p-0 dark:text-black lg:dark:text-white hover:text-green-color hover:scale-125 transition-all "> <i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="lg:block py-2 px-3 text-black   lg:p-0 dark:text-black lg:dark:text-white hover:text-green-color hover:scale-125 transition-all" ><i className="fa-brands fa-tiktok"></i></a>
                <a href="#" className="lg:block py-2 px-3 text-black   lg:p-0 dark:text-black lg:dark:text-white hover:text-green-color hover:scale-125 transition-all" ><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="lg:block py-2 px-3 text-black   lg:p-0 dark:text-black lg:dark:text-white hover:text-green-color hover:scale-125 transition-all" ><i className="fa-brands fa-linkedin"></i></a>
                <a href="#" className="lg:block py-2 px-3 text-black   lg:p-0 dark:text-black lg:dark:text-white hover:text-green-color hover:scale-125 transition-all" ><i className="fa-brands fa-youtube"></i></a>

              </li>
              {isLogin ? <li>
                <button onClick={handleLogout} className="block py-2 px-4 text-gray-800  text-center lg:p-0 dark:text-black lg:dark:text-white hover:text-red-500 hover:scale-110 transition-all group " >SignOut <i className="fa-solid fa-right-from-bracket group-hover:rotate-[360deg] transition-transform"></i></button>
              </li> :
                <>
                  <li>
                    <NavLink to='/login' className="block py-2 px-4 text-gray-800  text-center lg:p-0 dark:text-black lg:dark:text-white hover:text-green-color hover:scale-110 transition-all" >Login <i className="fa-solid fa-right-to-bracket"></i></NavLink>
                  </li>
                  <li>
                    <NavLink to='/register' className="block py-2 px-4 text-black text-center   lg:p-0 dark:text-black lg:dark:text-white hover:text-green-color hover:scale-110 transition-all" >Register</NavLink>
                  </li>
                </>}
            </ul>
          </div>
        </div>
      </div>
    </nav>

  )
}
