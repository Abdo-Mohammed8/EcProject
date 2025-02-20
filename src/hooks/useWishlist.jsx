import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'



export function getWishlist(){

   let token = localStorage.getItem('userToken')

    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        headers: {
            token
        }
    })
}

export default function useWishlist(fn) {
  let [enabled,setEnabled] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setEnabled(true)
    }
  },[localStorage.getItem('userToken')])
    return useQuery({
      queryKey: ['wishlist'],
      queryFn: fn,
      select:(data)=>data?.data,  
      retry:false,
      enabled
      
    })

  
}
