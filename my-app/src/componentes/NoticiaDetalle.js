import moment from "moment";
import 'moment/locale/es'; //Importar moment en español
import { Link } from "react-router-dom";
import { useContext } from "react";
import { contexto } from "./Context";
import parse from 'html-react-parser';
import { Helmet } from 'react-helmet';

const NoticiaDetalle = ({noticia})=>{

    document.title = noticia.titulo;
    const {login} = useContext(contexto)

    moment.locale('es')
    return (
        <>  
            <Helmet>
                <meta name="title" content={noticia.titulo}/>
                <meta name="description" content=""/>
                <meta property="og:image" content={noticia.imagen} />
                <meta property="og:title" content={noticia.titulo} />
            </Helmet>
            <div className="noticiaDetalle" key={noticia.idnoticia}>
                <img className="imagenPrincipal" src={noticia.imagen} alt="" />
                <h1>{noticia.titulo}</h1>
                <Link to={`/${noticia.categoria}`.toLowerCase()} ><h2 className={`searchTag ${noticia.categoria+"Tag"}`}>{noticia.categoria}</h2></Link>
                <h2 className="fecha">{noticia.fechatexto}</h2>
                {parse(noticia.info)}
                <Link to="editar" state={noticia}>
                    <div className="editarNoticia" style={{'display':` ${login ? 'flex' : 'none'}`}}>
                        <h3>Editar</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f1f1f1" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                            <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                    </div>  
                </Link>
            </div>
        </>

    )

}

export default NoticiaDetalle