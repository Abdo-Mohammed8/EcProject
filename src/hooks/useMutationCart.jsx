import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'





export function addToCart(productId){
    let token = localStorage.getItem('userToken');

    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},{
    headers:{
     token
    }
    })
}

export function updateCount({id,count}) {

    let token = localStorage.getItem('userToken');
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{
    headers:{
     token
    }
    })


}
export function deleteToCart(id){
    let token = localStorage.getItem('userToken');

    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    headers:{
     token
    }
    })
}

export function deleteAllCart(){
    let token = localStorage.getItem('userToken');
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:{
            token
        }
    })

}

export function paymentOnline({cartId,shippingAddress}) {
    let token = localStorage.getItem('userToken');

    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{shippingAddress},{

    headers:{token}
    })
    
}

export function paymentCash({cartId,shippingAddress}) {
    let token = localStorage.getItem('userToken');

    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{shippingAddress},{

    headers:{token}
    })
    
}



export default function useMutationCart(fn) {
    const queryClient = useQueryClient()
   return useMutation({ mutationFn:fn ,
    onSuccess:()=>{
    queryClient.invalidateQueries({ queryKey: ['cart'] })
   }    
              
})
}
