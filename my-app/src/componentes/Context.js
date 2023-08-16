import { createContext, useEffect, useState } from "react";
import Axios from "axios";

export const contexto = createContext()
const { Provider } = contexto

const MiProvider = ({children}) => {
    const [login,setLogin] = useState("")
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        Axios.get("https://envilo.com.ar/api/get")
        .then((response) => {
            setNoticias(response.data);
            console.log("cambio")
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            // setLoading(false);
            console.log("Terminó la carga")
        });
    }, []);

    const convertirURL = (texto)=>{
        //Eliminar tildes y mayusculas 
        const textoFormateado = texto.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9\s]/g, "").replace(/[\u0300-\u036f]/g, "");
        const textoGuionado = textoFormateado.replace(/ /g, "-")
        return textoGuionado;
    }

    const contextValue = {
        login,
        setLogin,
        convertirURL,
        noticias,
        setNoticias
    }

    return (
        <Provider value={contextValue}>
            {children}
        </Provider>
    )
}

export default MiProvider