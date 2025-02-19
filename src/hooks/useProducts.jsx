import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {
  // const queryClient = useQueryClient()
    function getProducts(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

  return useQuery({
    queryKey: ['products'],
    
    queryFn:getProducts,
    select:(data) => data?.data?.data,
    
    
    // queryClient.invalidateQueries({ queryKey: ['cart'] })
});
}