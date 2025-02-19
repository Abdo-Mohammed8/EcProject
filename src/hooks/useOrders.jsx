import { useQuery } from "@tanstack/react-query"
import axios from "axios"


 export function getOrders(catId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${catId}`)
}


export default function useOrders(fn) {
  return  useQuery({
    queryKey: ["orders"],
    queryFn:fn,
    select:(data)=>data?.data
  })
}
