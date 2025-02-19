
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './Components/Home'
import Cart from './Components/Cart'
import Products from './Components/Products'
import Categories from './Components/Categories'
import Brands from './Components/Brands'
import Register from './Components/Register'
import Login from './Components/Login'
import ProtectedRoute from './Components/ProtectedRoute'
import Productdetails from './Components/Productdetails'
import ErrorMsg from './Components/ErrorMsg'
import Allorders from './Components/Allorders'
import Wishlist from './Components/Wishlist'
import SubCategories from './Components/SubCategories'
import ResetPassword from './Components/ResetPassword'

function App() {
  
  const router = createBrowserRouter([
    {path:'/',element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:'/cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'/wishlist',element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
      {path:'/products',element:<Products/>},
      {path:'/productdetails',element:<Productdetails/>},
      {path:'/categories',element:<Categories/>,children:[
        {path:'subcategories',element:<SubCategories/>}]},
      {path:'/brands',element:<Brands/>},
      {path:'/register',element:<Register/>},
      {path:'/login',element:<Login/>},
      {path:'/resetpassword',element:<ResetPassword/>},
      {path:'/allorders',element:<ProtectedRoute><Allorders/></ProtectedRoute>},
      {path:'*',element:<ErrorMsg/>}, 
    ]}
  ])

  return (


<RouterProvider router={router}/>

  )
}

export default App
