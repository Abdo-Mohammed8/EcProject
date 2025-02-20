import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import useMutationCart, { addToCart } from '../hooks/useMutationCart';
import toast from 'react-hot-toast';
import { addToWishlist, deleteFromWishlist } from '../hooks/useMutationWishlist';


export default function ProductItem({prod ,flag,refetch}) {

    
    let {id, imageCover,title, category, priceAfterDiscount ,price ,ratingsAverage ,brand} = prod;


    let {data ,isPending,mutate,isSuccess ,error,isError ,reset:addCartReset} = useMutationCart(addToCart)


    let {data:wishlist,isPending:wishlistIsPending,isSuccess:wishlistIsSuccess,error:errorwishlist,isError:wishlistIsError, mutate:mutateWishlist , reset:addToWishlistReset} = useMutationCart(addToWishlist)

    let{mutate:deleteFormWhishlist,isPending:deleteIsPending ,isSuccess:deleteSuccess ,data:deleteMsg ,reset:deleteFromWishlistReset ,isError:deleteIsError,error:deleteError} = useMutationCart(deleteFromWishlist)

    if (!localStorage.getItem('userToken')){

        flag = false;

    }

    function handelWishlsit(id) {
        if (flag) {
            deleteFormWhishlist(id);
            
            flag = false;
        }else 
        {
            mutateWishlist(id);
            
        }  
    }


    useEffect (()=>{
        
        if (isSuccess) {
            toast.success(data?.data?.message);
            addCartReset()
        }
        if (isError){
                toast.error(error?.response?.data?.message);
                addCartReset()
        }
        if (wishlistIsSuccess) {
            toast.success(wishlist?.data?.message,{
                icon : '❤️'
            });
            addToWishlistReset()
            refetch()
            
        }
        if (wishlistIsError){
                toast.error(errorwishlist?.response?.data?.message);
                addToWishlistReset()
                 refetch()

        }
        if (deleteIsError){
                toast.error(deleteError?.response?.data?.message);
                addToWishlistReset()
                 refetch()

        }
        if (deleteSuccess) {
            toast.success(deleteMsg?.data?.message);
            deleteFromWishlistReset()
            refetch()
            
        }

        

             
    },[isSuccess,isError,wishlistIsSuccess,wishlistIsError,deleteSuccess,deleteIsError])
   

    
    return (
        <div className='xl:w-1/5 lg:w-1/4 md:w-1/3  sm:w-1/2 w-full    '>
       <div className="px-4 py-5 w-full h-full">
       <div className="h-full p-2 flex flex-col justify-between gap-3 overflow-hidden product bg-white transition-all rounded-lg ">
       <Link to = {'/productdetails'} state={{id,catId:category._id}}>
            <div className='mb-2 px-2'>
            <img className=' w-full ' src={imageCover} alt="product image"/>
            </div>
            <div className='px-1'>
            <h2 className='text-green-color font-bold'>{category.name}</h2>
            <div className='mb-3 flex justify-between items-center'>
            <span className='text-sm font-bold'>{brand.name}</span>
            <img className='w-20' src={brand.image} alt={brand.name} />
                
            </div>
            <span>{title.split(" ").slice(0, 2).join(" ")}</span>
            <div className='mt-6  flex justify-between '>
            <div className=''>
            <p className={priceAfterDiscount?'line-through text-red-600':''}>{`${price} EGP`}</p>
            {priceAfterDiscount?<p className={'font-bold'}>{`${priceAfterDiscount} EGP`}</p>:''}
            </div>
            <span className='font-bold text-sm '>{ratingsAverage} <span className='text-rating-color'><i className="fa-solid fa-star"></i></span></span>
            </div>
            
            </div>
            </Link>
            <div>
                <div className='flex justify-end'>
                <button onClick={()=>{handelWishlsit(id)}} className=' py-2 rounded-md '>{ wishlistIsPending || deleteIsPending?<i className='fa-solid fa-spinner animate-spin fa-xl'></i>:<i className={`fa-solid fa-heart fa-xl ${flag?'text-red-500':''}`}></i>}</button>
                </div>               
            </div>
            <button onClick={()=>{mutate(id)}} className='btn  py-2 rounded-md text-white font-semibold  hover:bg-green-color/80 transition-all '>{isPending?<i className='fa-solid fa-spinner animate-spin text-white fa-2xl'></i>:<><i className='fa-solid fa-plus'></i> Add</>}</button>
       
       </div>
     
       </div>
       </div>

)
}
