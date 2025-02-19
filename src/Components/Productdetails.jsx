import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ProductItem from './ProductItem';
import Loading from './Loading';
import ErrorMsg from './ErrorMsg';
import { useQuery } from '@tanstack/react-query';
import useMutationCart, { addToCart } from '../hooks/useMutationCart';
import toast from 'react-hot-toast';
import useWishlist, { getWishlist } from '../hooks/useWishlist';

export default function Productdetails() {

    let { state } = useLocation();


    let [srcImg, setSrcImg] = useState('');

    function setImg(e) {
        setSrcImg(e.target.src);
    }
    let {data:wishlsitAdded,refetch ,isFetching, isLoading:wishlistIsLoading} = useWishlist(getWishlist)






    function getProductsDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${state?.id}`)
    }

    let {data:products ,isLoading:productLoading ,isError:productIsError ,error:productError} = useQuery({
        queryKey: ['productDetails', state.id],
        queryFn: getProductsDetails,
        select: (data) => data?.data?.data,
        
    });

    function getRelatedProducts() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${state?.catId}`)
    }

    let {data:relatedProducts,refetch:relatedRefetch,isError:relatedProductsIsError,error:relatedProductsError,isLoading:relatedProductsLoading} = useQuery({
        queryKey: ['productRelated', state.catId],
        queryFn: getRelatedProducts,
        select: (data) => data?.data?.data,
    });
    

    let { data:Cart, isPending:CartIsPending,reset:resetCart, mutate, isSuccess:CartIsSuccess, error:CartError, isError:CartIsError } = useMutationCart(addToCart)

    

    useEffect(() => {
        if (CartIsSuccess) {
            toast.success(Cart?.data?.message)  
            resetCart()
        };
        if (CartIsError) {
            toast.error(CartError?.response?.data?.message)
            resetCart()
        };
    
        
        setSrcImg('')
    }, [CartIsSuccess, CartIsError,state.id,isFetching])

    

   



    if (productLoading || relatedProductsLoading) {

        return <Loading />

    }

    if (productIsError || relatedProductsIsError) {

        return <ErrorMsg error={productError?.message || relatedProductsError?.message} />

    }

    return (

        <>
            {<div className="container mt-10">
                <div className="flex bg-white shadow shadow-green-color rounded-md gap-5 items-center">
                    <div className="w-1/4 p-2">
                        <div className='mb-4'>
                            <img className=' w-full' src={!srcImg ? products?.imageCover : srcImg} alt={products?.title} />
                        </div>
                        <div className='flex flex-wrap justify-center gap-2'>
                            {products?.images?.map(img => <img className={`w-[20%] transition-all  cursor-pointer ${img == srcImg ? 'opacity-100 border-2 border-green-color scale-90 ' : 'opacity-60'}`} onClick={setImg} key={img} src={img} alt={products?.title} />)}
                        </div>
                    </div>
                    <div className='w-3/4 px-7'>

                        <h2 className='text-2xl font-bold mb-5'>{products?.title}</h2>
                        <p className='text-gray-500 mb-6'>
                            {products?.description}
                        </p>

                        <p className='text-gray-800 text-lg mb-1 font-semibold'>
                            {products?.category?.name}
                        </p>
                        <div className='flex justify-between'>
                            <span className='text-gray-600 mb-5 font-semibold'>
                                {products?.price} EGP
                            </span>
                            <span className='text-gray-800 mb-5 font-semibold'>
                                <i className='fa fa-star text-rating-color'></i> {products?.ratingsAverage}
                            </span>

                        </div>

                        <button onClick={() => { mutate(state?.id) }} className='text-center w-full bg-green-color text-white font-semibold py-3 rounded-md hover:bg-green-color/80 transition-all'>{CartIsPending? <i className='fa-solid fa-spinner animate-spin text-white fa-2xl'></i> : <><i className='fa-solid fa-plus'></i> Add To Cart</>}</button>

                    </div>
                </div>
                <div className='mt-5'>
                    <h2 className="text-[2rem] text-center text-green-color font-bold mb-5">Related Products</h2>
                    <div className='container flex flex-wrap mt-11'>
                        {relatedProducts?.map(ele => <ProductItem key={ele._id} prod={ele} refetch={refetch} flag={wishlsitAdded?.data?.map(filter=>filter?.id)?.filter(filter=>filter === ele._id)?.length >0? true:false} ></ProductItem>)}
                    </div>
                </div>
            </div>}

        </>

    )
}
