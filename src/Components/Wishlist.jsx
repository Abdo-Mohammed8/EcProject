import React, { useEffect, useState } from 'react'
import useMutationCart, { addToCart } from '../hooks/useMutationCart';
import useWishlist, { getWishlist } from '../hooks/useWishlist'
import useMutationWishlist, { deleteFromWishlist } from '../hooks/useMutationWishlist';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import BrandsEmpty from './../assets/no_wish_list.png';

import Loading from './Loading';


export default function Wishlist() {
  let [currunt, setcurrunt] = useState('');

  let { data: addCart, isPending: addCartIsPending, mutate:addCartMutate, isSuccess: addToCartSuccess, reset: addReset } = useMutationCart(addToCart)


  let { data, isLoading,isFetching } = useWishlist(getWishlist)

  let { data: delet, mutate:deleteMutate , isPending, isSuccess: deleteSuccess,isLoading:deleteLoading, reset: deleteRest } = useMutationWishlist(deleteFromWishlist)

  console.log(data?.count);
  function setIndex(e) {
    setcurrunt(e.currentTarget.getAttribute("index"))
  }

  // console.log(data?.data?.count);

  // console.log(delet?.data?.message);
  useEffect(() => {

    if (deleteSuccess&&isFetching) {
      toast.success(delet?.data?.message, {
        style: {
          background: 'white',
          color: 'black',

        },
        iconTheme: {
          primary: 'green',
          secondary: 'white',
        }
      })
      deleteRest()
      
    }
    if (addToCartSuccess&&isFetching) {
      toast.success(addCart?.data?.message)
      addReset()
      
    }
   
  }, [deleteSuccess, addToCartSuccess ,isFetching])

  if (isLoading ) {
    return <Loading></Loading>
  }


  return (
    <div className='container py-10 flex  justify-center'>
    {data?.count >0? <div className='w-full'>
     <div className=' w-full bg-gray-100 py-7 px-5 rounded-md'>
        <h1 className='text-3xl text-green-color font-bold text-center'>Wishlist</h1>
      </div>

      <div className='py-5'>
        <div className='flex w-full flex-wrap'>
          {data?.data?.map((ele, index) => <div key={ele._id} className=' w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
            <div className='w-full h-full p-5'>


              <div className="h-full p-4 font-semibold rounded-md hover:scale-105 shadow-md relative flex flex-col justify-between bg-white transition-all product ">
                <Link className='relative h-full' to={'/productdetails'} state={{ id: ele?.id, catId: ele?.category?._id }}>
                 <div className="flex flex-col h-full justify-between">

                 <div>
                 <div className=' relative'>
                    <div>
                      <img className='w-fullw-full rounded-lg' src={ele?.imageCover} alt={ele?.title} />
                    </div>
                    <span className='absolute right-2 top-2'><i className='fa-solid fa-heart text-red-500 fa-2xl'></i></span>


                  </div>
                  <div className='min-h-20 mt-3'>
                  <h2 className='text-green-color mb-2'>{ele?.category?.name}</h2>
                  <p className='mb-2'>{ele?.title}</p>
                  </div>
                  <div className='overflow-y-auto overflow- h-[100px]'>
                    <p className='mb-2 font-medium'>{ele?.description}</p>
                  </div>

                 </div>
                  
                  <div className='flex justify-between mt-2'>
                    <p className=''>Price : {ele?.price} EGP</p>
                    <p>{ele?.ratingsAverage} <i className="fa fa-star text-rating-color"></i></p>
                  </div>
                 </div>
                  
                </Link>
                <div className='flex justify-between flex-col gap-4 mt-10'>
                  <button index={index} onClick={(e) => { addCartMutate(ele?._id); setIndex(e) }} className='py-1 px-3 rounded-md text-green-color  font-semibold  border-2 border-green-color  hover:bg-green-color hover:text-white transition-all  '>{addCartIsPending && currunt == index ? <i className='fa-solid fa-spinner animate-spin'></i> :<i className='fa-solid fa-plus'></i>} Add To Cart</button>

                  <button index={index} onClick={(e) => { deleteMutate(ele?._id); setIndex(e) }} className=' py-1 px-3 rounded-md text-red-600 border-2 border-red-600 font-semibold  hover:bg-red-600 hover:text-white transition-all'>Remove {isPending && currunt == index? <i className='fa-solid fa-spinner  text-lg animate-spin '></i> : <i className="fa-solid fa-trash-can text-lg ml-2"></i>}</button>

                </div>
              </div>

            </div>
          </div>)}


        </div>
      </div>
     </div>:<img src={BrandsEmpty} />}

    </div>
  )
}
