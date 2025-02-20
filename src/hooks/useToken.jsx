import { useQuery } from "@tanstack/react-query";
import axios from "axios";


function getUserId(){

    let token  = localStorage.getItem('userToken')

    return axios.get(`https://ecommerce.routemisr.com/api/v1/auth/verifyToken`,{
        headers: {
            token 
            }
    })
}

export default function useToken(){


    return useQuery({
        queryKey: ['userId'],
        queryFn:  getUserId,
        select:(data)=>data?.data,
        
      })
}