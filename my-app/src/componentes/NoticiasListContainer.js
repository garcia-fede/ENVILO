import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { contexto } from './Context';
import NoticiaMediana from "./NoticiaMediana";
import LOGO from "../imagenes/LOGO.png";

const NoticiasListContainer = () => {
    const { categoria } = useParams();
    const { noticias } = useContext(contexto);
    const [cargando, setCargando] = useState(true);
    const [filteredNoticias, setFilteredNoticias] = useState([]);

    useEffect(() => {
        const filtered = noticias.filter(noticia => noticia.categoria.toLowerCase() === categoria);
        setFilteredNoticias(filtered);
        if(noticias.length==0){
            console.log("Cargando noticias...")
        } else {
            setCargando(false)
        }
    }, [categoria, noticias]);

    return (
        <>
            <Helmet>
                <meta name="title" content={`${categoria} - EnVilo News`} />
                <meta name="description" content={`Noticias sobre ${categoria} en el partido de Vicente Lopez.`} />
                <meta name="keywords" content={`VicenteLopez, Vilo, EnVilo, Noticias, ${categoria}`} />
            </Helmet>
            <div className="loader" style={{ 'opacity': `${cargando ? '1' : '0'}` }}>
                <img src={LOGO} alt="logo de carga" />
                <div className="loaderAnimacion"></div>
            </div>
            <main>
                <div className="noticiasList">
                    {filteredNoticias.map(noticia => (
                        <NoticiaMediana key={noticia.idnoticia} noticia={noticia} />
                    ))}
                </div>
            </main>
        </>
    );
}

export default NoticiasListContainer;
