import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import Axios from "axios"
import moment from "moment";
import 'moment/locale/es'; //Importar moment en español
import NoticiaDetalle from "./NoticiaDetalle";
import LOGO from "../imagenes/LOGO.png"

const NoticiaDetalleContainer = ()=>{

    moment.locale('es')
    const {noticia} = useParams()
    const [noticias,setNoticias] = useState([])
    const [cargando,setCargando] = useState(true)
    
    useEffect(()=>{
        Axios.get("https://envilo.com.ar/api/get").then((respuesta)=>{
            // Comparar titulos de la base de datos, pasandolos al formato URL y comparandolo con el URL de la noticia para obtener
            // la noticia correcta
            setNoticias(respuesta.data.filter(nota=>
                nota.titulo.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9\s]/g, "").replace(/[\u0300-\u036f]/g, "")==noticia.replace(/-/g, " ")))
        })
        setTimeout(() => {
            setCargando(false)
        }, 500);
    },[])    

    return(
        <>
            <div className="loader" style={{'opacity': ` ${cargando ? '1' : '0' }`}} >
                <img src={LOGO} alt="logo de carga" />
                <div className="loaderAnimacion"></div>
            </div>            
            <main>
                <div className="noticiasList">
                        {noticias.map(noticia=>{
                            return <NoticiaDetalle key={noticia.idnoticia} noticia = {noticia} />
                        })}
                </div>
            </main>
        </>
    )
}

export default NoticiaDetalleContainer