import { useState,useEffect,useContext } from "react"
import Axios from "axios"
import { Link } from "react-router-dom"
import NoticiaPequeña from "./NoticiaPequeña"
import NoticiaCategorias from "./NoticiaCategorias"
import moment from "moment";
import { contexto } from "./Context"
import { Helmet } from 'react-helmet';
import LOGO from "../imagenes/LOGO.png"


const LandingNoticias = () => {

    moment.locale('es')
    const [noticias,setNoticias] = useState([])
    const [deportes,setDeportes] = useState([])
    const [politica,setPolitica] = useState([])
    const [sociedad,setSociedad] = useState([])
    const [cultura,setCultura] = useState([])
    const [medioAmbiente,setMedioAmbiente] = useState([])
    const {convertirURL} = useContext(contexto)
    const [cargando,setCargando] = useState(true)

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
    let tituloURL = "";

    useEffect(()=>{
        Axios.get("https://envilo.com.ar/api/get").then((respuesta)=>{
            setNoticias(respuesta.data)
            setTimeout(() => {
                setCargando(false)
            }, 500);
        }).catch((error)=>{
            if (error.response) {
                console.log("The request was made and the server responded with a status code that falls out of the range of 2xx")
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log("The request was made but no response was received. error.request is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js")
                console.log(error.request);
            } else {
                console.log("Something happened in setting up the request that triggered an Error")
                console.log('Error', error.message);
            }
        })
    },[])  
    
    useEffect(()=>{
        filtrar(noticias)
        document.title = "EnVilo News";
    },[noticias])   

    return (
        <>
            <Helmet>
                <meta name="title" content="EnVilo News"/>
                <meta name="description" content="Noticias sobre el partido de Vicente Lopez. Actualidad, sociedad, cultura, politica, deportes y medio ambiente."/>
                <meta name="keywords" content="VicenteLopez, Vilo, EnVilo, Noticias, Sociedad, Cultura, Politica, Deportes, Actualidad" />
            </Helmet>
            <div className="loader" style={{'opacity': ` ${cargando ? '1' : '0' }`}} >
                <img src={LOGO} alt="logo de carga" />
                <div className="loaderAnimacion"></div>
            </div>            
            <main>
                <div className="landingContainer">
                        <div className="ultimaNoticiaContainer">
                            {noticias.slice(Math.max(noticias.length - 1)).map(noticia=>{
                                ultimaNoticia=noticia;
                                tituloURL = convertirURL(ultimaNoticia.titulo)
                            })}
                            <Link to={`/noticia/${tituloURL}`}><img className="ultimaNoticiaImg" src={ultimaNoticia.imagen} alt="" /></Link>
                            <div key={ultimaNoticia.idnoticia}><p><Link to={`/noticia/${tituloURL}`}><h2 id="tituloUltima">{ultimaNoticia.titulo}</h2></Link><h3 className="fecha">{moment(ultimaNoticia.fechaformato).fromNow()}</h3></p><Link to={`/${ultimaNoticia.categoria}`.toLowerCase()}><h3 className={`searchTag ${ultimaNoticia.categoria+"Tag"}`}>{ultimaNoticia.categoria}</h3></Link></div>                           
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