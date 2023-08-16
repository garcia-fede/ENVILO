import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import {contexto} from './Context'
import moment from "moment";
import 'moment/locale/es'; // Importar moment en español
import NoticiaDetalle from "./NoticiaDetalle";
import LOGO from "../imagenes/LOGO.png"

// Normalize string for comparison
function normalizeString(str) {
    return str.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9\s]/g, "").replace(/[\u0300-\u036f]/g, "");
}

const NoticiaDetalleContainer = () => {
    moment.locale('es')
    const { noticia } = useParams()
    const { convertirURL, noticias, setNoticias } = useContext(contexto);
    const [noticiaDisplay, setNoticiaDisplay] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filteredNoticias = noticias.filter(nota => normalizeString(nota.titulo) === normalizeString(noticia.replace(/-/g, " ")));
                setNoticiaDisplay(filteredNoticias);
                if(noticias.length==0){
                    console.log("Cargando noticias...")
                } else {
                    setCargando(false)
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [noticia,noticias])


    return (
        <>
            <div className="loader" style={{ 'opacity': `${cargando ? '1' : '0'}` }} >
                <img src={LOGO} alt="logo de carga" />
                <div className="loaderAnimacion"></div>
            </div>
            <main>
                <div className="noticiasList">
                    {noticiaDisplay.map(noticia=>{
                        return(
                            <NoticiaDetalle noticia={noticia}></NoticiaDetalle>
                        )
                    })}
                </div>
            </main>
        </>
    )
}

export default NoticiaDetalleContainer
