import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Loading from './Loading';

export default function SubCategories({cat}) {

    let {state} = useLocation();
    

    console.log(state?.catId);
    function getSubCategories() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${state?.catId}/subcategories`)
      
      }
      
      let{data:sub , isLoading:subLoading ,isError:subIsError,error:subError,refetch} = useQuery({
        queryKey: ['subCategories',state?.catId],
        queryFn:getSubCategories,
        select:(data)=>data?.data,
       
      })
      

  return (
    <div className='text-center fixed   top-0 bottom-0 left-0 right-0 bg-gray-400/80 overflow-y-scroll h-screen'>
      <div className='text-center mt-20 mb-10  mx-auto w-[90%]'>
        <h2 className='text-white text-2xl  font-bold px-10 py-6  bg-green-color/80 rounded-xl'>
         {state?.catName} SubCategories
        </h2>
      </div>
      {!subLoading?<>{ sub?.data?.length >0?<div className='flex flex-wrap justify-center items-center'>
          {sub?.data?.map((ele)=><div className='w-full  md:w1/2 lg:w-1/3 px-5 py-2'>
            <div className='bg-white group  h-full overflow-hidden border rounded-lg border-gray-200 hover:border-green-color hover:bg-gray-100 transition-all '>
            <h2 className='px-2 py-4 text-green-color text-2xl font-bold group-hover:scale-110 transition-all'>{ele.name}</h2>
            </div>

          </div>)}
          

        </div>:<h2 className='bg-white group w-full   mx-auto py-5 overflow-hidden border rounded-lg border-gray-200 hover:border-green-color hover:bg-gray-100 text-3xl font-bold transition-all'>There are no subcategories</h2>}</>:<h2 className='text-2xl text-green-color animate-bounce bg-light-color px-8 py-5 rounded-md'>Please wait....</h2>}
      <div className='text-center my-10'>
      <Link className=' rounded-xl font-bold  text-center text-red-600 px-14 hover:shadow-md hover:shadow-red-500 py-4 bg-white transition-all group ' to ='/categories'>Close <i className="fa-solid fa-xmark group-hover:animate-bounce"></i></Link>
      
      </div>
      </div>
  )
}
