import React, { useEffect } from 'react'
import useMutationCart, { paymentCash, paymentOnline } from '../hooks/useMutationCart';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as motion from "motion/react-client"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function PayMent({cartId ,flag}) {

  let navigate = useNavigate()
    let {data:online,isSuccess:onlineSuccess , mutate:paymentOnlineMutate ,isPending:onlinePending} = useMutationCart(paymentOnline);

    let { mutate:paymentCashMutate , reset:cashReset ,isSuccess:paymentSuccess ,isPending:cashPending} = useMutationCart(paymentCash);

    

   
      
    

 let validationSchema = Yup.object().shape({

   details:Yup.string().min(4,'Details is too short').required('Details of your address is required'),
   phone:Yup.string().matches(/^(\+(?=2))?2?01(?![3-4])[0-5]{1}[0-9]{8}$/,'Phone number is invalid, accept only egypt phone numbers').required('Phone number is required'),
   city:Yup.string().min(3,'City is too short').required('City is required'),
  });



    let formikOnline = useFormik({
        initialValues: {
          details: '',
      
          phone: '',
      
          city: ''
        },
        validationSchema: validationSchema,
      
         onSubmit:()=>paymentOnlineMutate({cartId, shippingAddress:formikOnline.values})
       
         
      })
    let formikCash = useFormik({
        initialValues: {
          details: '',
      
          phone: '',
      
          city: ''
        },
        validationSchema: validationSchema,
      
         onSubmit:()=>paymentCashMutate({cartId, shippingAddress:formikCash.values})
       
         
      })

      useEffect(()=>{
        if (paymentSuccess){
          toast.success('The cash order was completed successfully')
          cashReset()
          navigate('/allorders')
          
         
        }
        if (onlineSuccess) {
          toast.success('The order was completed successfully')
          window.location.href= online?.data?.session?.url
        }
      },[paymentSuccess,onlineSuccess])
      
  return (
   <>
    {flag&&<motion.div
    
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
    }}><form className="max-w-sm mx-auto my-5" onSubmit={formikOnline.handleSubmit}>
    <div className="mb-5">
      <label htmlFor="details" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your Address details</label>
      <input 
      type="text" 
      id="details"
      value={formikOnline.values.details} 
      onChange={formikOnline.handleChange}
      onBlur={formikOnline.handleBlur} 

      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-color focus:border-grring-green-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-color dark:focus:border-grring-green-color" required placeholder="" />
    </div>
    {formikOnline.errors.details && formikOnline.touched.details ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span className="font-medium">{formikOnline.errors.details}</span>
           </div>:''}
    <div className="mb-5">
      <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your Phone number</label>
      <input 
      type="tel" 
      id="phone" 
      value={formikOnline.values.phone} 
      onChange={formikOnline.handleChange}
      onBlur={formikOnline.handleBlur} 


      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-color focus:border-grring-green-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-color dark:focus:border-grring-green-color" required placeholder="" />
    </div>
    {formikOnline.errors.phone && formikOnline.touched.phone ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span className="font-medium">{formikOnline.errors.phone}</span>
           </div>:''}
    <div className="mb-5">
      <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your City</label>
      <input 
      type="text" 
      id="city" 
      value={formikOnline.values.city} 
      onChange={formikOnline.handleChange}
      onBlur={formikOnline.handleBlur} 

      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-color focus:border-grring-green-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-color dark:focus:border-grring-green-color" required placeholder="" />
    </div>
    {formikOnline.errors.city && formikOnline.touched.city ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span className="font-medium">{formikOnline.errors.city}</span>
           </div>:''}
    <div>



</div>

    <div>

<button  type="submit" className="text-white w-full bg-green-color hover:bg-green-color/80  focus:outline-none font-semibold rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-green-color dark:hover:bg-green-color dark:focus:ring-green-color transition-all">To Online Payment  {onlinePending? <i className='fa-solid fa-spinner  text-lg animate-spin '></i>:<i className="fa-regular fa-credit-card ml-2"></i>} </button>

    </div>
  </form></motion.div>}
    {!flag&&<motion.div
    
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
    }}><form className="max-w-sm mx-auto my-5" onSubmit={formikCash.handleSubmit}>
    <div className="mb-5">
      <label htmlFor="details" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your Address details</label>
      <input 
      type="text" 
      id="details"
      value={formikCash.values.details} 
      onChange={formikCash.handleChange}
      onBlur={formikCash.handleBlur} 

      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-color focus:border-grring-green-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-color dark:focus:border-grring-green-color" required placeholder="" />
    </div>
    {formikCash.errors.details && formikCash.touched.details ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span className="font-medium">{formikCash.errors.details}</span>
           </div>:''}
    <div className="mb-5">
      <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your Phone number</label>
      <input 
      type="tel" 
      id="phone" 
      value={formikCash.values.phone} 
      onChange={formikCash.handleChange}
      onBlur={formikCash.handleBlur} 


      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-color focus:border-grring-green-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-color dark:focus:border-grring-green-color" required placeholder="" />
    </div>
    {formikCash.errors.phone && formikCash.touched.phone ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span className="font-medium">{formikCash.errors.phone}</span>
           </div>:''}
    <div className="mb-5">
      <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your City</label>
      <input 
      type="text" 
      id="city" 
      value={formikCash.values.city} 
      onChange={formikCash.handleChange}
      onBlur={formikCash.handleBlur} 

      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-color focus:border-grring-green-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-color dark:focus:border-grring-green-color" required placeholder="" />
    </div>
    {formikCash.errors.city && formikCash.touched.city ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           <span className="font-medium">{formikCash.errors.city}</span>
           </div>:''}
    <div>



</div>

    <div>

<button  type="submit" className="text-white w-full bg-green-color hover:bg-green-color/80  focus:outline-none font-semibold rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-green-color dark:hover:bg-green-color dark:focus:ring-green-color transition-all">To Cash Payment  {cashPending? <i className='fa-solid fa-spinner  text-lg animate-spin '></i>:<i className="fa-regular fa-credit-card ml-2"></i>} </button>

    </div>
  </form></motion.div>}
   </>
    
  )
}
