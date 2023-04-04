import { createContext, useState } from "react";

export const contexto = createContext()
const { Provider } = contexto

const MiProvider = ({children}) => {
    const [login,setLogin] = useState("")

    const convertirURL = (texto)=>{
        //Eliminar tildes y mayusculas 
        const textoFormateado = texto.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9\s]/g, "").replace(/[\u0300-\u036f]/g, "");
        const textoGuionado = textoFormateado.replace(/ /g, "-")
        return textoGuionado;
    }

    const contextValue = {
        login,
        setLogin,
        convertirURL
    }

    return (
        <Provider value={contextValue}>
            {children}
        </Provider>
    )
}

export default MiProvider