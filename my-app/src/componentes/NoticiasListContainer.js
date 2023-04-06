import NoticiaMediana from "./NoticiaMediana"
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import { Helmet } from 'react-helmet';
import Axios from "axios"
import LOGO from "../imagenes/LOGO.png"

const NoticiasListContainer = () =>{
    const {categoria} = useParams()

    const [noticias,setNoticias] = useState([])
    const [cargando,setCargando] = useState(true)

    useEffect(()=>{
        Axios.get("https://envilo.com.ar/api/get").then((respuesta)=>{
            setNoticias(respuesta.data.filter(noticia=>noticia.categoria.toLowerCase()==categoria))
            setTimeout(() => {
                setCargando(false)
            }, 500);
        }).catch((error)=>{
            console.log(error)
        })
    },[categoria])   

    return(
        <>
            <Helmet>
                <meta name="title" content={`${categoria} - EnVilo News`} />
                <meta name="description" content={`Noticias sobre ${categoria} en el partido de Vicente Lopez.`}/>
                <meta name="keywords" content={`VicenteLopez, Vilo, EnVilo, Noticias, ${categoria}`} />
            </Helmet>
            <div className="loader" style={{'opacity': ` ${cargando ? '1' : '0' }`}} >
                <img src={LOGO} alt="logo de carga" />
                <div className="loaderAnimacion"></div>    
            </div>            
            <main>
                <div className="noticiasList">
                    {noticias.map(noticia=>{
                        return <NoticiaMediana key={noticia.idnoticia} noticia = {noticia} />
                    })}
                </div>
            </main>
        </>
    )
}

export default NoticiasListContainer