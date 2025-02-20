
import useCart, { getCart } from '../hooks/useCart'
import Loading from './Loading'
import ErrorMsg from './ErrorMsg'
import CartEmpty from './../assets/cart-empty.jpg'

import useMutationCart, { deleteAllCart, deleteToCart, updateCount } from '../hooks/useMutationCart'
import { useContext, useState } from 'react'
import PayMent from './PayMent'


export default function Cart() {

  let [countLoad, setCountLoad] = useState('');
  let [open, setOpen] = useState(false);
  let [choise, setChoise] = useState(false);
  let [flag, setFlag] = useState(null);

  

  let { data: Cart, isError, isLoading, error  } = useCart(getCart)
    
  
 

  let { mutate, isPending: updatePending,isSuccess } = useMutationCart(updateCount)
  let {data, mutate: deletemutate, isPending: deletePending } = useMutationCart(deleteToCart)
  let { mutate: deleteAllMutate, isPending: deleteAllPending } = useMutationCart(deleteAllCart)


  function setIndex(e) {
    setCountLoad(e.currentTarget.getAttribute("index"))

  }



  if (isLoading) {

    return <Loading />
  }
  if (isError) {
    return <ErrorMsg error={error} />
  }



  return (
    
    <div className="container flex justify-center ">
      {Cart?.numOfCartItems ? <div className="relative w-full lg:w-[80%] mt-16  overflow-x-auto shadow-md sm:rounded-lg">
        <div className='bg-gray-100/50 px-3 py-5 '>
          <div className='flex flex-col md:flex-row justify-between mb-2 mt-7'>
            <div className='w-full md:w-1/2 lg:w-2/3 xl:w-3/4'>
              <h2 className='text-3xl font-semibold mb-5'>Cart Shop</h2>
              <h2 className='text-lg font-semibold mb-6'>Total number of products : <span className='text-green-color/70'>{Cart?.numOfCartItems}</span></h2>
              <p className='text-sm font-semibold text-left'>Added : <span className="font-bold text-green-color ">{Cart?.data?.createdAt}</span></p>
              <p className='text-sm font-semibold'>Last Update : <span className="font-bold text-green-color">{Cart?.data?.createdAt}</span></p>
            </div>

            <div className=' w-full mt-5  md:w-1/2 lg:w-1/2 xl:w-1/4'>
              <h2 className=' font-semibold text-lg mb-4'>Total price :  <span className='text-green-color/70  font-extrabold'>{Cart?.data?.totalCartPrice}</span> EGP</h2>
              <button onClick={() =>{setChoise(!choise);setOpen(false)}} className='py-2 mb-5 px-4 w-full font-semibold  text-white rounded-md bg-green-color hover:bg-green-color/70 transition-all'>Checkout</button>
                
            
            
              {choise&&<div>
              <div>
                  <button onClick={() => { setFlag(true);setOpen(true) }} className='py-2 mb-5 px-4 w-full font-semibold  text-white rounded-md bg-green-color hover:bg-green-color/70 transition-all'>OnLine payment</button>
                  <button onClick={() => { setFlag(false);setOpen(true) }} className='py-2 px-4 w-full font-semibold  text-white rounded-md bg-green-color hover:bg-green-color/70 transition-all'>Cash payment</button>
                </div> 
                <div>
                {open&&<PayMent flag={flag} cartId={Cart?.cartId}/>}
                </div>
              </div>}
            </div>
          </div>

        </div>
        <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

          <div>
            {Cart?.data?.products?.map((ele, index) => <div key={ele._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

              <div className='flex p-4'>
                <div className='w-1/3 max-w-60 overflow-hidden'>
                  <img src={ele?.product?.imageCover} className="w-full" alt={ele?.product?.title} />
                </div>
                <div className='w-2/3 max-w-full'>
                  <div className="px-2 py-2 font-semibold  text-gray-900 dark:text-white">
                    <p className='text-green-color mb-2'>{ele?.product?.category?.name}</p>
                    <p>{ele?.product?.title}</p>
                  </div>
                  <div>
                    <div className="px-2 py-2">
                      <div className="flex items-center">
                        <button index={index} onClick={(e) => { mutate({ id: ele?.product?.id, count: ele?.count - 1 }); setIndex(e) }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-white bg-red-500/80 border border-gray-300 rounded-full focus:outline-none hover:bg-red-500 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                          <i className='fa-solid fa-minus'></i>
                        </button>
                        <div>
                          {updatePending  &&countLoad == index ?
                            <i className='fa-solid fa-spinner text-xl fa-spin text-green-color animate-spin'></i>
                            : <input type="number" index={index} onBlur={(e) => { mutate({ id: ele?.product?.id, count: e.target.value }); setIndex(e) }} id="first_product" className="bg-gray-50 w-16  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-color focus:border-grering-green-color block pl-3 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-color dark:focus:border-grering-green-color" placeholder={ele.count} />
                          }
                        </div>
                        <button index={index} onClick={(e) => { mutate({ id: ele?.product?.id, count: ele?.count + 1 }); setIndex(e) }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-white bg-green-color/80 border border-gray-300 rounded-full focus:outline-none hover:bg-green-color focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="px-2 py-2 font-semibold text-gray-900 dark:text-white">
                      {ele?.price} EGP
                    </div>
                    <div className="px-2 py-2">
                      <button index={index} onClick={(e) => { deletemutate(ele?.product?.id); setIndex(e) }} className=" text-red-500 hover:text-white border-2 font-semibold border-red-400 hover:border-red-700 py-1 px-5 rounded-md dark:text-red-500 hover:bg-red-700 transition-all">Remove {deletePending && countLoad == index ? <i className='fa-solid fa-spinner text-lg animate-spin '></i> : <i className="fa-solid fa-trash-can text-lg ml-2"></i>}</button>
                    </div>
                  </div>
                </div>

              </div>


            </div>)}
          </div>
        </div>
        <div className='py-5 flex flex-col items-center gap-1'>
          <button onClick={deleteAllMutate} className='py-2 px-3 mt-4 rounded-md text-white font-semibold  bg-red-600 hover:bg-red-500 transition-all'>Clear your cart {deleteAllPending ? <i className='fa-solid fa-spinner  text-lg animate-spin '></i> : <i className="fa-solid fa-trash-can text-lg ml-2"></i>}</button>
        </div>
      </div> : <img src={CartEmpty} />}
    </div>
    
  )

}
