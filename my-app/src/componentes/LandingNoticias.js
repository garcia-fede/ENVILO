import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import { contexto } from "./Context";
import { Helmet } from 'react-helmet';
import NoticiaPequeña from "./NoticiaPequeña";
import NoticiaCategorias from "./NoticiaCategorias";
import LOGO from "../imagenes/LOGO.png";

function LandingNoticias() {
    moment.locale('es');
    const { convertirURL, noticias, setNoticias } = useContext(contexto);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
            if(noticias.length==0){
                console.log("Cargando noticias...")
            } else {
                setCargando(false)
            }
    }, [noticias]);

    const categorias = ["Sociedad", "Politica", "Cultura", "Deportes"];
    const ultimaNoticia = noticias.length > 0 ? noticias[noticias.length - 1] : null;
    const tituloURL = ultimaNoticia ? convertirURL(ultimaNoticia.titulo) : "";

    const recentNoticias = useMemo(() => {
        return noticias.slice(noticias.length - 5, noticias.length - 1);
    }, [noticias]);

    return (
        <>
            <Helmet>
                <meta name="title" content="EnVilo News"/>
                <meta name="description" content="Noticias sobre el partido de Vicente Lopez. Actualidad, sociedad, cultura, politica, deportes y medio ambiente."/>
                <meta name="keywords" content="VicenteLopez, Vilo, EnVilo, Noticias, Sociedad, Cultura, Politica, Deportes, Actualidad" />
            </Helmet>
            <div className="loader" style={{ 'opacity': `${cargando ? '1' : '0'}` }}>
                <img src={LOGO} alt="logo de carga" />
                <div className="loaderAnimacion"></div>
            </div>
            <main>
                <div className="landingContainer">
                    <div className="ultimaNoticiaContainer">
                        {ultimaNoticia && (
                            <>
                                <Link to={`/noticia/${tituloURL}`}>
                                    <img className="ultimaNoticiaImg" src={ultimaNoticia.imagen} alt="" />
                                </Link>
                                <div key={ultimaNoticia.idnoticia}>
                                    <p>
                                        <Link to={`/noticia/${tituloURL}`}>
                                            <h2 id="tituloUltima">{ultimaNoticia.titulo}</h2>
                                        </Link>
                                    </p>
                                    <Link to={`/${ultimaNoticia.categoria}`.toLowerCase()}>
                                        <h3 className={`searchTag ${ultimaNoticia.categoria + "Tag"}`}>
                                            {ultimaNoticia.categoria}
                                        </h3>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="otrasNoticiasContainer">
                        <h1>Noticias recientes</h1>
                        {recentNoticias.map(noticia => (
                            <NoticiaPequeña key={noticia.idnoticia} noticia={noticia} />
                        ))}
                    </div>
                </div>
                <h1 className="subtituloCategorias">MÁS NOTICIAS</h1>
                <div className="categoriasContainerDoble">
                    {categorias.map(categoria => (
                        <section key={categoria}>
                            {noticias
                                .filter(noticia => noticia.categoria === categoria)
                                .slice(-3)
                                .map(noticia => (
                                    <NoticiaCategorias key={noticia.idnoticia} noticia={noticia} />
                                ))}
                        </section>
                    ))}
                </div>
            </main>
        </>
    );
}

export default LandingNoticias;
