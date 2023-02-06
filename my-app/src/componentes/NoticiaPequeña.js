import {Link} from "react-router-dom"
import moment from "moment";

const NoticiaPequeña = ({noticia}) =>{
    moment.locale('es')
    const ruta = "/Noticia/"+noticia.idnoticia
    return (
        <>
            <div className="noticiaPequeña">
                <div><Link to={ruta}><img src={noticia.imagen} alt="" /></Link></div>
                <div className="previewNoticia">
                    <Link to={`Categoria/${noticia.categoria}`}><h2 className={`searchTag ${noticia.categoria+"Tag"}`}>{noticia.categoria}</h2></Link>
                    <Link to={ruta}><h2>{noticia.titulo}</h2></Link>
                    <h3 className="fecha">{moment(noticia.fechaformato).fromNow()}</h3>
                </div>
            </div>
        </>
    )
}

export default NoticiaPequeña
