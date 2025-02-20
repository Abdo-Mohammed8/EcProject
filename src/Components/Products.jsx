
import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem';
import Loading from './Loading';
import ErrorMsg from './ErrorMsg';

import useProducts from '../hooks/useProducts';
import useWishlist, { getWishlist } from '../hooks/useWishlist';


export default function Products() {



  let [products , setProducts] = useState([]);

  let {isError,data,error,isLoading} = useProducts()

 
  let {data:wishlsitAdded,refetch , isLoading:wishlistIsLoading} = useWishlist(getWishlist)

  

  function filterItems(query) {
    setProducts(data?.filter((el) => el?.title?.toLowerCase().includes(query.toLowerCase())));
  }
 
 
useEffect(()=>{
  setProducts(data)


},[data ,wishlsitAdded])


if (isLoading) {
  return <Loading />
}
if (isError) {

  return <ErrorMsg error={error?.message} />
}

  return (
    <>


    <div className='container mt-11'>
      <div>
        
<form className="w-full  lg:w-[60%] mx-auto">
  <div className="flex">
    <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
    
    <div className="relative w-full">
      <input onKeyDown={(e)=>{filterItems(e.target.value)}} type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg  border border-gray-300 focus:ring-green-color focus:border-grring-green-color dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-grring-green-color transition-all rounded-md" placeholder="Products Search" required />
      <span className='absolute top-2 end-4'><i className="fa-solid fa-magnifying-glass" /></span>

    </div>
  </div>
</form>

      </div>
      <div className='flex flex-wrap mt-2 '>
        

      {products?.map(ele=><ProductItem key ={ele._id} prod ={ele} refetch={refetch}  flag={wishlsitAdded?.data?.map(filter=>filter?.id)?.filter(filter=>filter === ele._id)?.length >0? true:false} ></ProductItem>)}
    

      </div>
     </div>
    </>
  )
}

