import React from 'react'
import Error from './../assets/error.svg'

export default function ErrorMsg({error}) {
  return (
    <div className='w-full flex-col flex justify-center '>
      <img src={Error} alt="error" className='w-full h-[500px] mx-auto'/>
      <h2 className='text-6xl text-center text-green-color font-bold'>
        {error? error :'Invalid Path'} <i class="fa-solid fa-triangle-exclamation text-red-600"></i>
      </h2>
    </div>
  )
}
