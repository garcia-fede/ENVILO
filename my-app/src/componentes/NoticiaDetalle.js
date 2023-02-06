import moment from "moment";
import 'moment/locale/es'; //Importar moment en español
import { Link } from "react-router-dom";
import parse from 'html-react-parser';

const NoticiaDetalle = ({noticia})=>{

    moment.locale('es')
    return (
        <>
            <div className="noticiaDetalle" key={noticia.idnoticia}>
                <img className="imagenPrincipal" src={noticia.imagen} alt="" />
                <h1>{noticia.titulo}</h1>
                <Link to={`/Categoria/${noticia.categoria}`} ><h2 className={`searchTag ${noticia.categoria+"Tag"}`}>{noticia.categoria}</h2></Link>
                <h2 className="fecha">{noticia.fechatexto}</h2>
                {parse(noticia.info)}
            </div>
            
        </>

    )

}

export default NoticiaDetalle