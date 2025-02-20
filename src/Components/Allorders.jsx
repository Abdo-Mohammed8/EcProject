import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from './Loading';
import ErrorMsg from './ErrorMsg';
import useToken from '../hooks/useToken';

export default function Allorders() {




let { data:userId,isLoading,error:idError,isError:idIsError } =  useToken()

  let{ data:orders , isLoading:loading ,refetch ,error:orderError, isError:orderIsError } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    select:(data)=>data?.data,
    enabled:false
  })


  function getOrders(){

    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId?.decoded?.id}`)
  }

 
  useEffect(()=>{
    if(userId){
      refetch()
    }

  },[userId])

  if (loading || isLoading){

    return <Loading></Loading>
  }
  if (orderIsError || idIsError){

    return <ErrorMsg error={orderError?.message || idError?.message}></ErrorMsg>
  }

  return (
    <div className="container flex flex-col items-center justify-center ">
{orders?.length>0?<>
     <div className=' w-[80%] bg-gray-100 py-7 px-5 rounded-md'>
        <h1 className='text-3xl text-green-color font-bold text-center'>All orders</h1>
      </div>


{orders?.map((order)=>
    <div key={order?._id} className="relative w-full lg:w-[80%] mt-5  overflow-x-auto shadow-md sm:rounded-lg">
      <div className='bg-gray-100/50 px-3 pt-5 pb-1'>
        <div className='flex flex-col md:flex-row justify-between mb-2 mt-7'>
          

<div className="relative w-full">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-green-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-4 py-3">
                Order Details
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                Tax price
                </th>
                <td className="px-6 py-4">
                <span className='text-green-color/70 font-semibold'>{order?.taxPrice} EGP</span>
                </td>
                
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                Shipping price
                </th>
                <td className="px-6 py-4">
                <span className='text-green-color/70 font-semibold'>{order?.shippingPrice} EGP</span>
                </td>
                
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                Total order price
                </th>
                <td className="px-6 py-4">
                <span className='text-green-color/70 font-semibold'>{order?.totalOrderPrice} EGP</span>
                </td>
                
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
               <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                Payment method type
                </th>
                <td className="px-6 py-4">
                <span className='text-green-color/70 font-semibold'>{order?.paymentMethodType}</span>
                </td>
                
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
               <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                
                Paid
                </th>
                <td className="px-6 py-4">
                {order?.isPaid?<span className='text-lg font-semibold  mb-2 flex items-center flex-wrap gap-4'><i className="fa-solid fa-check fa-xl text-green-color/70"></i><span className='text-green-color/70 text-sm'> At {order?.paidAt}</span></span>:<i className="fa-solid fa-xmark animate-pulse fa-xl text-red-600"></i>}
                </td>
                
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                Delivered
                </th>
                <td className="px-6 py-4">
                <span className=''>{order?.isDelivered? <i className="fa-solid fa-check fa-xl text-green-color/70"></i>:<i className="fa-solid fa-xmark animate-pulse fa-xl text-red-600"></i>}</span>
                </td>
                
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                Created at
                </th>
                <td className="px-6 py-4">
                <span className="font-bold text-green-color ">{order?.createdAt}</span>
                </td>
                
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                Last Update
                </th>
                <td className="px-6 py-4">
                <span className="font-bold text-green-color">{order?.updatedAt}</span>
                </td>
                
            </tr>
        </tbody>
    </table>
  </div>
       
        </div>

      </div>
      <div className="flex justify-center flex-wrap">
        
      

      {order?.cartItems?.map((item)=>
      
    <div key={item._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4   px-2 py-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

    <div className='flex h-full bg-white product rounded-md overflow-hidden transition-all'>
      <div className='w-1/3 max-w-60 overflow-hidden'>
        <img src={item?.product?.imageCover} className="w-full" alt={item?.product?.title} />
      </div>
      <div className='w-2/3 max-w-full'>
        <div className="px-2 py-2 font-semibold  text-gray-900 dark:text-white">
          <p className='text-green-color mb-2'>{item?.product?.category?.name}</p>
          <p className='mb-2'>Count : {item?.count}</p>
          <p className='mb-2'>{item?.product?.title}</p>
          <p className='mb-2'>Brand : {item?.product?.brand?.name} <img className='w-10' src={item?.product?.brand?.image} alt={item?.product?.brand?.name}/></p>
        </div>
        <div>
          <div className="px-2 py-2 font-semibold text-gray-900 dark:text-white">
           Price : {item?.price} EGP
          </div>
          <div className='px-2 py-2 font-semibold text-gray-900 dark:text-white'> 
            <span>{item?.product?.ratingsAverage}  <i className='fa-solid fa-star text-rating-color'></i></span>
          </div>
          
        </div>
      </div>

    </div>


  </div>

)}
      </div>
      
    </div>)}
</>:<div className='w-[80%] text-center'>
  
  <h2 className='w-full bg-light-color text-2xl font-bold mt-10 py-10 rounded-xl '>
  There are no orders yet
  </h2>
  
  </div>}
    
  </div>
  )
}
