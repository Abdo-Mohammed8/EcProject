import { useQuery } from "@tanstack/react-query"
import axios from "axios"


// export function getSubCategories(catId) {

    
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${catId}/subcategories`)

// }

export default function useSubCategories(fn){
    
    return useQuery({
        queryKey: ['subcategories'],
        queryFn: fn,
        select:(data) => data?.data,
        enabled:false
        })
}