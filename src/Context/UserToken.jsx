import { createContext, useEffect, useState } from "react";


export let userToken = createContext(null);

export default function UserTokenContextProvider({children}){


    let [isLogin,setLogin] = useState(null);

    useEffect(()=>{

        if (localStorage.getItem('userToken')){
            setLogin(localStorage.getItem('userToken'))
        }
        
    },[])

    return <userToken.Provider value={{isLogin,setLogin}}>
        {children}
    </userToken.Provider>


}