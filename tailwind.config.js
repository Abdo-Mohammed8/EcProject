/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",


    // flowbite.content()
  ],
  theme: {
    screens: {
      'sm': '640px',
      

      'md': '768px',
     

      'lg': '1024px',
    

      'xl': '1280px',
      

      '2xl': '1520px',
      
    },
    colors:{

      "green-color":"#0aad0a",
      "light-color":"#f0f3f2",
      "rating-color":"#ffc908"
      
    
    
    },
  
    container:{
      center: true,
      padding:"2rem",
      
    },
    
    extend: {

    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

