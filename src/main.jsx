
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../node_modules/flowbite/dist/flowbite.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UserTokenContextProvider from './Context/UserToken.jsx';



const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  
    <QueryClientProvider client={queryClient}>
      
      <UserTokenContextProvider>
       
<Toaster
position="top-right"
toastOptions={{
// Define default options
className: '',
duration: 5000,
removeDelay: 1000,
style: {
  background : 'green',
  color: '#fff',
  boxShadow : '1px 1px 10px #4fa74f'

},


success: {
duration: 3000,
iconTheme: {
  primary: 'white',
  secondary: '#000',
},
},
}}
/>
  <App/>
  <ReactQueryDevtools initialIsOpen={false} />
  
</UserTokenContextProvider>
  
    </QueryClientProvider>
  
   
         
  
)
