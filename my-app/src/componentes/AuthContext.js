import { createContext, useState } from "react";

export const contexto = createContext()
const { Provider } = contexto

const MiProvider = ({children}) => {
    const [login,setLogin] = useState("")
    console.log("Local",localStorage.getItem('logueado'))
    const contextValue = {
        login,
        setLogin,
    }

    return (
        <Provider value={contextValue}>
            {children}
        </Provider>
    )
}

export default MiProvider