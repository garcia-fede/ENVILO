import {Link} from "react-router-dom"
import moment from "moment";
import { useContext } from "react";
import { contexto } from "./Context";
import 'moment/locale/es'; //Importar moment en español

const NoticiaCategorias = ({noticia}) =>{
    moment.locale('es')
    const {convertirURL} = useContext(contexto)
    const tituloURL = convertirURL(noticia.titulo)
    const ruta = "/Noticia/"+tituloURL

    return (
        <>
            <div className="noticiaCategorias">
                <Link to={ruta}><img src={noticia.imagen} alt="" /></Link>
                <div className="previewNoticia">
                    <Link to={`/${noticia.categoria}`.toLowerCase()}><h2 className={`searchTag ${noticia.categoria+"Tag"}`}>{noticia.categoria}</h2></Link>
                    <Link to={ruta}><h2 className="tituloMediano">{noticia.titulo}</h2></Link>
                    <h3 className="fecha">{moment(noticia.fechaformato).fromNow()}</h3>
                </div>
            </div>
        </>
    )
}

export default NoticiaCategorias