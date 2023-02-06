import {Link} from "react-router-dom"
import moment from "moment";
import 'moment/locale/es'; //Importar moment en español

const NoticiaCategorias = ({noticia}) =>{
    moment.locale('es')
    const ruta = "/Noticia/"+noticia.idnoticia

    return (
        <>
            <div className="noticiaCategorias">
                <Link to={ruta}><img src={noticia.imagen} alt="" /></Link>
                <div className="previewNoticia">
                    <h2 className={`searchTag ${noticia.categoria+"Tag"}`}>{noticia.categoria}</h2>
                    <Link to={ruta}><h2 className="tituloMediano">{noticia.titulo}</h2></Link>
                    <h3 className="fecha">{moment(noticia.fechaformato).fromNow()}</h3>
                </div>
            </div>
        </>
    )
}

export default NoticiaCategorias