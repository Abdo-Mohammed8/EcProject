import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ResetPassword() {

  let navigate = useNavigate();
  // let [loading,setLoading] = useState(false);
  let [toggle,setToggle] = useState(false);
  let [ToNewpassowrd,setToNewpassword] = useState(false);

  let {data,isPending:ResetLoading,error:resetError,isError:resetIsError, isSuccess:sendSuccess,reset:sendReset ,mutate:mutateReset}= useMutation({
    mutationFn: handelReset,
    onSuccess: () => {
      setToggle(true);
        

    }
  })

 
  //  console.log(data?.data);
  //  console.log(resetError?.response?.data?.message);
  
  function handelReset(values) {

    return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
    
  }
  let {data:code,error:codeError,isError:codeIsError ,isPending:CodeLoading,isSuccess:codeSuccess,reset:codeReset ,mutate:mutateCode}= useMutation({
    mutationFn: handelCode,
    onSuccess: () => {
      setToNewpassword(true);
    }
  })
  let {data:ResetPassword,error:ResetPasswordError,isError:ResetPasswordIsError ,isPending:ResetPasswordLoading,isSuccess:ResetPasswordSuccess,reset:ResetPasswordReset ,mutate:mutatResetPassword}= useMutation({
    mutationFn: handelNewPassword,
    onSuccess: () => {
      navigate('/login');
    }
  })

  console.log(ResetPassword);
  console.log(ResetPasswordError);
 
  //  console.log(code);
    // console.log(codeError);
  
  function handelCode(values) {

    return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
    
  }
  function handelNewPassword(values) {

    console.log(values);
    return axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
    
  }



  let emeilFormValidation = Yup.object().shape({

    email:Yup.string().email('Invalid email').required('Email is required'),

  });
  let codeFormValidation = Yup.object().shape({

    resetCode:Yup.string().max(6,'Not valid code').min(6, 'Not valid code').required('Code is required'),

  });
  let resetFormValidation = Yup.object().shape({

    email:Yup.string().email('Invalid email').required('Email is required'),
    newPassword:Yup.string().min(8,'Password too short, must be at least 8 characters long.').required('Passsword is required'),
  

  });

  let formik = useFormik({

    initialValues: {
      email:'',

    },
    validationSchema:emeilFormValidation ,
    onSubmit:mutateReset,

  })




  let formikCode = useFormik({

    initialValues: {
      resetCode:'',
    },
    validationSchema:codeFormValidation ,
    onSubmit:mutateCode,

  })
  let formikNewpassword = useFormik({

    initialValues: {
      email:'',
      newPassword:'',
    },
    validationSchema:resetFormValidation ,
    onSubmit:mutatResetPassword,

  })

useEffect(()=>{
  if(codeSuccess){
    toast.success(code?.data?.status)
    codeReset()    
  }
  if(sendSuccess){
    toast.success(data?.data?.message)
    sendReset()
  }
  if(ResetPasswordSuccess){
    toast.success('password reset successfully');
    ResetPasswordReset()
  }
  if(ResetPasswordIsError){
    toast.error(ResetPasswordError?.response?.data?.message)
    ResetPasswordReset()
    
  }
  if(resetError){
    toast.error(resetError?.response?.data?.message)
    sendReset()
  }
  if (codeIsError){
    toast.error(codeError?.response?.data?.message)
    codeReset()
  }
},[sendSuccess,codeSuccess,resetIsError,codeIsError,ResetPasswordIsError,ResetPasswordSuccess])


  return (
   <div className="container  mt-10">
    <div className='text-center font-bold text-2xl '>
      
    </div>
    <div className="flex justify-center flex-col gap-10 items-center h-[400px] w-full ">
    
      
      {!ToNewpassowrd&&<div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] bg-white border shadow-md hover:shadow-green-color drop-shadow-md rounded-2xl py-5 px-8 transition-all'>
    
     <form onSubmit={formik.handleSubmit} className=" w-full mb-8">
      <h2 className='mx-auto w-full text-center font-bold text-2xl mb-5 text-green-color'>Reset Password</h2>
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
        
        <button  type="submit" className={formik.isValid ?'text-white  bg-green-color hover:bg-green-color/75  focus:outline-none  font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-border-green-color dark:hover:bg-green-color dark:focus:ring-green-color':'text-white bg-green-color/60   focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  cursor-not-allowed'}>
         {ResetLoading?<i className="fa-solid fa-spinner animate-spin text-white"></i>:<>{!toggle?'Send Verification Code':'Send Again'}</>}</button>
     </form>
        
      {toggle&&<form onSubmit={formikCode.handleSubmit} className="w-full flex flex-col justify-center items-center mb-5 ">
        <div className="relative  mb-3 group">
          <input 
          type="text"  
          id="resetCode" 
          value={formikCode.values.resetCode} 
          onChange={formikCode.handleChange}
          onBlur={formikCode.handleBlur} 
          className="block py-2.5 px-0  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer" placeholder=''/>
          <label htmlFor="resetCode" className="peer-focus:font-semibold font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-border-green-color peer-focus:text-green-color  peer-focus:dark:text-border-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">code</label>
        </div>
        
        <button  type="submit" className={formikCode.isValid ?'text-white  bg-green-color hover:bg-green-color/75  focus:outline-none  font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-border-green-color dark:hover:bg-green-color dark:focus:ring-green-color':'text-white bg-green-color/60   focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  cursor-not-allowed'}>
          {CodeLoading?<i className="fa-solid fa-spinner animate-spin text-white"></i>:'verification'}</button>
      </form>}
      </div>}
      {ToNewpassowrd&&<div className='w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] bg-white border shadow-md hover:shadow-green-color drop-shadow-md rounded-2xl py-5 px-8 transition-all'>
    
    <form onSubmit={formikNewpassword.handleSubmit} className=" w-full mb-2">
      <h2 className='mx-auto w-full text-center font-bold text-2xl mb-5 text-green-color'>Reset Password</h2>
        <div className="relative z-0 w-full mb-5 group">
          <input 
          type="email"  
          id="email" 
          value={formikNewpassword.values.email} 
          onChange={formikNewpassword.handleChange}
          onBlur={formikNewpassword.handleBlur} 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer" placeholder=''/>
          <label htmlFor="email" className="peer-focus:font-semibold font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-border-green-color peer-focus:text-green-color  peer-focus:dark:text-border-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Email address</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input 
          type="password"  
          id="newPassword" 
          value={formikNewpassword.values.newPassword} 
          onChange={formikNewpassword.handleChange}
          onBlur={formikNewpassword.handleBlur} 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer" placeholder=''/>
          <label htmlFor="newPassword" className="peer-focus:font-semibold font-semibold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-border-green-color peer-focus:text-green-color  peer-focus:dark:text-border-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Email address</label>
        </div>
        
        <button  type="submit" className={formikNewpassword.isValid ?'text-white  bg-green-color hover:bg-green-color/75  focus:outline-none  font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-border-green-color dark:hover:bg-green-color dark:focus:ring-green-color':'text-white bg-green-color/60   focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  cursor-not-allowed'}>
         {ResetPasswordLoading?<i className="fa-solid fa-spinner animate-spin text-white"></i>:'Send'}</button>
      </form>
        
          
      </div>}
    
    


      
      
    </div>

  </div>
  )
}
