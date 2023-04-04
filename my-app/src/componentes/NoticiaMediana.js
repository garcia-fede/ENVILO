import {Link,useNavigate} from "react-router-dom"
import moment from "moment";
import 'moment/locale/es'; //Importar moment en español
import eliminar from "../imagenes/eliminar.png"
import Axios from 'axios'
import { useContext } from "react";
import { contexto } from "./Context";


const NoticiaMediana = ({noticia}) =>{
    moment.locale('es')
    const navegar = useNavigate();
    const {login, convertirURL} = useContext(contexto)
    const tituloURL = convertirURL(noticia.titulo)
    const ruta = "/noticia/"+tituloURL
    //Función para visualizar preview de la noticia sin tags de HTML
    const RemoveHTMLTags = (textoReemplazar)=>{
        const pattern = new RegExp("\\<.*?\\>");
        if(textoReemplazar.includes("<"||">")){
            textoReemplazar = new String(textoReemplazar).replace(pattern, "");
            return RemoveHTMLTags(textoReemplazar)
        }
        else{
            return textoReemplazar
        }
    }
    const previewNoticia = RemoveHTMLTags(noticia.info)
    const eliminarNoticia = ()=>{
            Axios.post("https://envilo.com.ar/api/eliminar",{
                idnoticia: noticia.idnoticia
            }).then(()=>{
                alert("Noticia eliminada")
                navegar("/")
            }).catch(()=>{
                console.log("Hubo un error al eliminar la noticia")
            })
    }
    document.title = `${noticia.categoria}`;

    return (
        <>
            <div className="noticiaMediana">
                <Link to={ruta}><img src={noticia.imagen} alt="" /></Link>
                <div className="previewNoticia">
                    <h2 className={`searchTag ${noticia.categoria+"Tag"}`}>{noticia.categoria}</h2>
                    <Link to={ruta}><h2 className="tituloMediano">{noticia.titulo}</h2></Link>
                    <h3 className="fecha">{moment(noticia.fechaformato).fromNow()}</h3>
                    <p className="info">{previewNoticia}</p>
                    <Link to={ruta}><button>Seguir leyendo &#62;</button></Link>
                    <div className="eliminarNoticia" style={{'display':` ${login ? 'flex' : 'none'}`}} onClick={eliminarNoticia}>
                        <img src={eliminar} alt="cruz-eliminar" />
                        <h3>Eliminar noticia</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoticiaMediana