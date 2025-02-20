import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export function addToWishlist (productId) {

    let token = localStorage.getItem('userToken') 
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{
        headers: {token}
    })
}
export function deleteFromWishlist(id) {
  let token = localStorage.getItem('userToken')

  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
    headers: {token}
  })
}

export default function useMutationWishlist(fn) {

  const queryClient = useQueryClient()
  return useMutation({ mutationFn:fn,
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ['wishlist']});    
    }
    
})
}
  
  

