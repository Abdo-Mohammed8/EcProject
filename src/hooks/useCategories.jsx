import { useQuery } from "@tanstack/react-query"
import axios from "axios"

 function getCategories() {

    
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

}

export default function useCategories(){
    
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        select:(data) => data?.data?.data,
        
        
        })
}