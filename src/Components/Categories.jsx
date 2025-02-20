
import React from 'react'
import useCategories from '../hooks/useCategories'
import Loading from './Loading'

import { Link, Outlet } from 'react-router-dom'

export default function Categories() {





  let{data:categories , isLoading:categoriesisLoading ,isError:categoriesIsError,error:categoriesError} = useCategories()



  
  if (categoriesisLoading){

    return <Loading/>
  }
  return (
 
    <div className="container relative">
      <div className='text-center mx-auto w-[90%]'>
        <h2 className='text-green-color text-4xl my-4 font-bold px-10 py-4  bg-gray-100 rounded-xl'>
         All Categories
        </h2>
      </div>
      <div className='flex flex-wrap'>
       {
        categories?.map((category) => 
        <Link to ="subcategories" state={{catId:category._id ,catName:category?.name}}  key={category?._id} className='w-full md:w-1/2 lg:w-1/3 px-5 py-8 '>
        <div className='bg-white  h-full overflow-hidden border border-gray-200 hover:border-green-color/80 rounded-lg product transition-all hover:scale-105'>
          <img className=' w-full h-[350px] object-cover' src={category?.image} alt={category?.name} />
          
            <h2 className='text-3xl font-bold text-green-color text-center py-5'>
              {category?.name}
            </h2>
          
        </div>


      </Link>)
       }
        

      </div>
      <Outlet/>
    </div>

  )
}
