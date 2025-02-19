
import React from 'react'

import Loading from './Loading'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


export default function Brands() {


function getBrands (){

  return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
}


  let{data:brands , isLoading:brandsisLoading ,isError:brandsIsError,error:brandsError} = useQuery({

    queryKey: ['brands'],
    queryFn: getBrands,
    select:(data)=>data?.data?.data,

  })




  
  if (brandsisLoading){

    return <Loading/>
  }
  return (
 
    <div className="container relative">
      <div className='text-center mx-auto w-[90%]'>
        <h2 className='text-green-color text-4xl my-4 font-bold px-10 py-4  bg-gray-100 rounded-2xl'>
         All Brands
        </h2>
      </div>
      <div className='flex flex-wrap'>
       {
        brands?.map((brand) => 
        <div  key={brand?._id} className='w-full md:w-1/2 lg:w-1/4 px-5 py-8 '>
        <div className='bg-white   h-full overflow-hidden border border-gray-200 hover:border-green-color/80 rounded-lg product transition-all hover:scale-105'>
          <img className=' w-full  object-cover' src={brand?.image} alt={brand?.name} />
          
            <h2 className='text-3xl border-t font-bold text-green-900 text-center py-5'>
              {brand?.name}
            </h2>
          
        </div>


      </div>)
       }
        

      </div>
    </div>

  )
}
