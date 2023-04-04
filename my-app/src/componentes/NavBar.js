import {Link} from "react-router-dom"
import LOGO from "../imagenes/LOGO.png"
import twitter from "../imagenes/twitter.png"
import instagram from "../imagenes/instagram.png"
import linkedin from "../imagenes/linkedin.png"
import email from "../imagenes/email.png"
import soleado from "../imagenes/soleado.png"
import parcialmente_nublado from "../imagenes/parcialmente_nublado.png"
import nublado from "../imagenes/nublado.png"
import lluvia from "../imagenes/lluvia.png"
import tormenta from "../imagenes/tormenta.png"
import moment from "moment";
import 'moment/locale/es'; //Importar moment en español
import { useContext, useEffect, useState } from "react"
import { contexto } from "./Context"
import Axios from "axios"

const NavBar = () => {
    const {login,setLogin} = useContext(contexto)
    const [temperatura,setTemperatura] = useState()
    const [icono,setIcono] = useState()
    const [tiempo,setTiempo] = useState()

    let clima_api_key = "476369efd7bdf05b9d0869c2d38d25fd";
    let elementoPost;
    if(login==true){
        elementoPost = <li className="item" id="subirPosteo"><Link to="NoticiaNueva/">Subir posteo</Link></li>
    }
    else{
        elementoPost = ""
    }

    moment.locale('es')
    let hamburger = true;
    const items = document.getElementsByClassName("item")
    window.addEventListener("resize",()=>{
        if(window.innerWidth>950){
            for(const item of items)
            {
                item.style.display='block'
            }
            document.getElementById("hamburger").checked=false
            hamburger = true;
        }
        else{
            for(const item of items)
            {
                item.style.display='none'
            }
        }
    })

    const toggleHamburger = ()=>{
        if(hamburger){
            for(const item of items)
            {
                item.style.display='block'
            }
            hamburger=!hamburger
        }
        else{
            for(const item of items)
            {
                item.style.display='none'
            }
            hamburger=!hamburger
        }
    }

    const seleccionarIcono = (icon)=>{
        switch (icon) {
            case "01n":
            case "01d":
                return <img className="iconoClima" src={soleado} />;
            case "02n":
            case "03n": 
            case "02d":
            case "03d":
                return <img className="iconoClima" src={parcialmente_nublado} />;
            case "04d":
            case "04n":
                return <img className="iconoClima" src={nublado} />;
            case "09d":
            case "10d":
            case "09n":
            case "10n":
                return <img className="iconoClima" src={lluvia} />;
            case "11d":
            case "11n":
                return <img className="iconoClima" src={tormenta} />;
            default:
                return;
        }
    }

    useEffect(()=>{
        const fetchData = async () => {
            const resultado = await Axios(
                `https://api.openweathermap.org/data/2.5/weather?lat=-34.5244484&lon=-58.5036282&appid=${clima_api_key}`
            );
            let {temp} = resultado.data.main
            setTemperatura(Math.round(temp-273) + "°C")
            let {icon} = resultado.data.weather[0]
            setIcono(seleccionarIcono(icon))
            
            const reloj = new Date()
            const relojFormateado = reloj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setTiempo(relojFormateado)
            };
        fetchData();
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            const reloj = new Date()
            const relojFormateado = reloj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setTiempo(relojFormateado)
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return(
        <>
            <div className="topLine">
                <ul>
                    <li>{moment().format('LL')}</li>
                    <li>{tiempo}</li>
                    <li className="temperatura">
                        {icono}
                        <p>{temperatura}</p>
                    </li>
                    <div className="redes">
                        <li><a target="_blank" href="https://twitter.com/envilonews" rel="noopener noreferrer"><img className="icon" src={twitter} alt="twitterIcon" /></a></li>
                        <li><a target="_blank" href="https://www.instagram.com/envilonews/?hl=es-la" rel="noopener noreferrer"><img className="icon" src={instagram} alt="instagramIcon" /></a></li>
                        <li><a target="_blank" href="https://www.linkedin.com/in/garcialucianag/" rel="noopener noreferrer"><img className="icon" src={linkedin} alt="linkedinIcon" /></a></li>
                        <li><a href="#formContacto"><img className="icon" src={email} alt="emailIcon" /></a></li>
                    </div>
                </ul>
            </div>
            <ul className="navBar">
                <input type="checkbox" id="hamburger" onClick={toggleHamburger} />
                <label htmlFor="hamburger" className="hamburger_button">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <div><Link to="/"><img src={LOGO} alt="logo" id="LOGO"/></Link></div>
                <li className="item"><Link to="/">Inicio</Link></li>
                <li className="item"><Link to="/sociedad">Sociedad</Link></li>
                <li className="item"><Link to="/politica">Politica</Link></li>
                <li className="item"><Link to="/deportes">Deportes</Link></li>
                <li className="item"><Link to="/cultura">Cultura</Link></li>
                <li className="item"><Link to="/medioambiente">Medio ambiente</Link></li>
                {elementoPost}
            </ul>
        </>
    )
}

export default NavBar 