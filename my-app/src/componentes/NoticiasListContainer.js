import NoticiaMediana from "./NoticiaMediana"
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import { Helmet } from 'react-helmet';
import Axios from "axios"

const NoticiasListContainer = () =>{
    const {categoria} = useParams()

    const [noticias,setNoticias] = useState([])

    useEffect(()=>{
        Axios.get("https://envilo.com.ar/api/get").then((respuesta)=>{
            setNoticias(respuesta.data.filter(noticia=>noticia.categoria.toLowerCase()==categoria))
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