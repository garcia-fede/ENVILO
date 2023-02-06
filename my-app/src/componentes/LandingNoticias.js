import { useState,useEffect,useContext } from "react"
import Axios from "axios"
import { Link } from "react-router-dom"
import NoticiaPequeña from "./NoticiaPequeña"
import NoticiaCategorias from "./NoticiaCategorias"
import moment from "moment";
import { contexto } from "./AuthContext"

const LandingNoticias = () => {

    const {login,setLogin} = useContext(contexto)
    moment.locale('es')
    const [noticias,setNoticias] = useState([])
    const [deportes,setDeportes] = useState([])
    const [politica,setPolitica] = useState([])
    const [sociedad,setSociedad] = useState([])
    const [cultura,setCultura] = useState([])
    const [medioAmbiente,setMedioAmbiente] = useState([])

    const filtrar = (noticias)=>{
        let filtro = noticias.filter(noticia=>noticia.categoria=="Deportes")
        setDeportes(filtro)
        filtro = noticias.filter(noticia=>noticia.categoria=="Politica")
        setPolitica(filtro)
        filtro = noticias.filter(noticia=>noticia.categoria=="Sociedad")
        setSociedad(filtro)
        filtro = noticias.filter(noticia=>noticia.categoria=="MedioAmbiente")
        setMedioAmbiente(filtro)
        filtro = noticias.filter(noticia=>noticia.categoria=="Cultura")
        setCultura(filtro)
    }

    let ultimaNoticia = "";

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/get").then((respuesta)=>{
            // setNoticias(respuesta.data.slice(Math.max(respuesta.data.length - 4))) //Almacenar las ultimas noticias
            setNoticias(respuesta.data)
        })
    },[])  
    
    useEffect(()=>{
        filtrar(noticias)
    },[noticias])   

    return (
        <>
            <main>
                <div className="landingContainer">
                        <div className="ultimaNoticiaContainer">
                            {noticias.slice(Math.max(noticias.length - 1)).map(noticia=>{
                                ultimaNoticia=noticia;
                            })}
                            <Link to={`/Noticia/${ultimaNoticia.idnoticia}`}><img className="ultimaNoticiaImg" src={ultimaNoticia.imagen} alt="" /></Link>
                            <div key={ultimaNoticia.idnoticia}><p><Link to={`/Noticia/${ultimaNoticia.idnoticia}`}><h2 style={{ fontSize: 30 }}>{ultimaNoticia.titulo}</h2></Link><h3 className="fecha">{moment(ultimaNoticia.fechaformato).fromNow()}</h3></p><Link to={`Categoria/${ultimaNoticia.categoria}`}><h3 className={`searchTag ${ultimaNoticia.categoria+"Tag"}`}>{ultimaNoticia.categoria}</h3></Link></div>                           
                        </div>
                        <div className="otrasNoticiasContainer">
                            <h1>Noticias recientes</h1>
                            {noticias.slice(noticias.length-5,noticias.length-1).map(noticia=>{
                                return <NoticiaPequeña key={noticia.idnoticia} noticia = {noticia} />
                            })}
                        </div>
                </div>
                <h1 className="subtituloCategorias">MÁS NOTICIAS</h1>
                <div className="categoriasContainerDoble">
                    <section>
                        {sociedad.slice(sociedad.length-3).map(noticia=>{
                                return <NoticiaCategorias key={noticia.idnoticia} noticia = {noticia} />
                        })}
                    </section>
                    <section>
                        {politica.slice(politica.length-3).map(noticia=>{
                                return <NoticiaCategorias key={noticia.idnoticia} noticia = {noticia} />
                        })}
                    </section>
                    <section>
                        {cultura.slice(cultura.length-3).map(noticia=>{
                                return <NoticiaCategorias key={noticia.idnoticia} noticia = {noticia} />
                        })}
                    </section>
                    <section>
                        {deportes.slice(deportes.length-3).map(noticia=>{
                                return <NoticiaCategorias key={noticia.idnoticia} noticia = {noticia} />
                        })}
                    </section>
                </div>
                
            </main>
        </>
    )
}


export default LandingNoticias