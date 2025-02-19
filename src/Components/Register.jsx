import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userToken } from '../Context/UserToken';
import toast from 'react-hot-toast';


export default function Register() {
  let [loading,setLoading] = useState(false);
  let navigate = useNavigate();

  let {setLogin} = useContext(userToken);

  async function handleSubmit(values) {
    setLoading(true);
    try {
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values);

      if (data.message === 'success'){
        localStorage.setItem('userToken',data.token);
        setLogin(data.token);
        navigate ('/');
        setLoading(false);
        toast.success('The account has been created successfully')

      }
      
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }
  let validationSchema = Yup.object().shape({

    name:Yup.string().min(3,'Name is too short').max(10,'Name is too long').required('Name is required'),
    email:Yup.string().email('Invalid email').required('Email is required'),
    password:Yup.string().matches(/^[A-Z](?=(.*\d){4,}).*$/,' Password must start with an uppercase letter and contain at least 4 numbers.').min(8,'Password too short, must be at least 8 characters long.').required('Passsword is required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'Passwords do not match').required('Confirm password is required'),
    phone:Yup.string().matches(/^(\+(?=2))?2?01(?![3-4])[0-5]{1}[0-9]{8}$/,'Phone number is invalid, accept only egypt phone numbers').required('Phone number is required'),
  });


  let formik = useFormik({

    initialValues: {
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema ,
    onSubmit:handleSubmit,

  })





  return (
    <div className="container  mt-10">
      <div className='text-center font-bold text-2xl mb-9'>
        
      </div>
      <div className="flex justify-center items-center h-[400px] w-full ">
        
        <form onSubmit={formik.handleSubmit} className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] bg-white border shadow-md hover:shadow-green-color drop-shadow-md rounded-2xl py-5 px-8 transition-all ">
        <h2 className='mx-auto w-full text-center font-bold text-2xl mb-5 text-green-color'>Register now</h2>
       
        <div className="relative z-0 w-full mb-5 group">
            <input 
            type="text"  
            id="name" 
            value={formik.values.name} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer" placeholder=''/>
            <label htmlFor="name" className="peer-focus:font-semibold font-semibold  absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-border-green-color peer-focus:text-green-color  peer-focus:dark:text-border-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">First name</label>
          </div>
          {formik.errors.name && formik.touched.name ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span className="font-medium">{formik.errors.name}</span>
           </div>:''}
          <div className="relative z-0 w-full mb-5 group">
            <input 
            type="email"  
            id="email" 
            value={formik.values.email} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer" placeholder=''/>
            <label htmlFor="email" className="peer-focus:font-semibold font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-border-green-color peer-focus:text-green-color  peer-focus:dark:text-border-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Email address</label>
          </div>
          {formik.errors.email && formik.touched.email ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span className="font-medium">{formik.errors.email}</span>
           </div>:''}
          
          <div className="relative z-0 w-full mb-5 group">
            <input 
            type="password" 
            id="password" 
            value={formik.values.password} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer" placeholder=''/>
            <label htmlFor="password" className="peer-focus:font-semibold font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-border-green-color peer-focus:text-green-color  peer-focus:dark:text-border-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Password</label>
          </div>
          {formik.errors.password && formik.touched.password ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span className="font-medium">{formik.errors.password}</span>
           </div>:''}
          <div className="relative z-0 w-full mb-5 group">
            <input 
            type="password" 
            id="rePassword" 
            value={formik.values.rePassword} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer" placeholder=''/>
            <label htmlFor="rePassword" className="peer-focus:font-semibold font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-border-green-color peer-focus:text-green-color  peer-focus:dark:text-border-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Confirm password</label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span className="font-medium">{formik.errors.rePassword}</span>
           </div>:''}
          <div className="relative z-0 w-full mb-5 group">
            <input 
            type="tel"  
            id="phone" value={formik.values.phone} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer" placeholder=''/>
            <label htmlFor="phone" className="peer-focus:font-semibold font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-border-green-color peer-focus:text-green-color  peer-focus:dark:text-border-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Phone number</label>
          </div>
          {formik.errors.phone && formik.touched.phone ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span className="font-medium">{formik.errors.phone}</span>
           </div>:''}
           
          <button  type="submit" className={formik.isValid ?'text-white  bg-green-color hover:bg-green-color/75  focus:outline-none  font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-border-green-color dark:hover:bg-green-color dark:focus:ring-green-color':'text-white bg-green-color/60   focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  cursor-not-allowed'}>
            {loading?<i className="fa-solid fa-spinner animate-spin text-white"></i>:'Register'}</button>
        </form>
      </div>

    </div>

  )
}
