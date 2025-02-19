import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userToken } from '../Context/UserToken';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';



export default function Login() {
  let [error, setError] = useState('');
  let [loading,setLoading] = useState(false);

  let navigate = useNavigate();
 
  let {setLogin} = useContext(userToken);

  async function handelLogin(values) {
    setLoading(true);
    try {
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values);

      if (data.message === 'success'){

        localStorage.setItem('userToken',data.token);
        setLogin(data.token);
        navigate ('/');
        setLoading(false);
        setError('')

      }
     
    } catch (error) {
      setError(error.response.data.message);

      setLoading(false);
    }
  }
  let validationSchema = Yup.object().shape({

    email:Yup.string().email('Invalid email').required('Email is required'),
    password:Yup.string().min(8,'Password too short, must be at least 8 characters long.').required('Passsword is required'),
  });

  let formikLogin = useFormik({

    initialValues: {
      email:'',
      password:'',

    },
    validationSchema ,
    onSubmit:handelLogin,

  })

  return (
    

    <div className="container  mt-10">
    <div className='text-center font-bold text-2xl '>
      
    </div>
    <div className="flex justify-center items-center h-[400px] w-full ">
    
      <form onSubmit={formikLogin.handleSubmit} className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] bg-white border shadow-md hover:shadow-green-color drop-shadow-md rounded-2xl py-5 px-8 transition-all ">
      <h2 className='mx-auto w-full text-center font-bold text-2xl mb-5 text-green-color'>Login</h2>
        <div className="relative z-0 w-full mb-5 group">
          <input 
          type="email"  
          id="email" 
          value={formikLogin.values.email} 
          onChange={formikLogin.handleChange}
          onBlur={formikLogin.handleBlur} 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer" placeholder=''/>
          <label htmlFor="email" className="peer-focus:font-semibold font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-border-green-color peer-focus:text-green-color  peer-focus:dark:text-border-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Email address</label>
        </div>
        {formikLogin.errors.email && formikLogin.touched.email ?
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
         <span className="font-medium">{formikLogin.errors.email}</span>
         </div>:''}
        
        <div className="relative z-0 w-full mb-5 group">
          <input 
          type="password" 
          id="password" 
          value={formikLogin.values.password} 
          onChange={formikLogin.handleChange}
          onBlur={formikLogin.handleBlur} 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer" placeholder=''/>
          <label htmlFor="password" className="peer-focus:font-semibold font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-border-green-color peer-focus:text-green-color  peer-focus:dark:text-border-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Password</label>
        </div>
        {formikLogin.errors.password && formikLogin.touched.password ?
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
         <span className="font-medium">{formikLogin.errors.password}</span>
         </div>:''}
         {error?<div className="p-4 mb-4 text-lg  text-red-500 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
         <span className="font-bold flex justify-between"><span>{error}</span> <i className="fa-solid fa-triangle-exclamation"></i></span>
         </div>:''}
         <div className="flex justify-center flex-col items-center w-full mt-5">
           <Link to ='/resetpassword'  className=' text-green-color font-semibold mb-4 hover:scale-110  transition-all'>Forgot your password ?</Link> 

          <Link to ='/register' className='hover:scale-110 font-semibold transition-all'> You do not have an account ? <span className='text-green-color mb-4 hover:scale-110  transition-all'> Register now</span></Link>
         </div>
        <button  type="submit" className={formikLogin.isValid ?'text-white  bg-green-color hover:bg-green-color/75  focus:outline-none  font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-border-green-color dark:hover:bg-green-color dark:focus:ring-green-color':'text-white bg-green-color/60   focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  cursor-not-allowed'}>
          {loading?<i className="fa-solid fa-spinner animate-spin text-white"></i>:'Login'}</button>
      </form>

    
      
    </div>

  </div>


  )
}
