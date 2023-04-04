import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

    return (
        <div className="bottomLine">
            <section className='sitemap'>
                <ul>
                    <h2>Categorias</h2>
                    <li><Link to="/sociedad">Sociedad</Link></li>
                    <li><Link to="/politica">Politica</Link></li>
                    <li><Link to="/deportes">Deportes</Link></li>
                    <li><Link to="/cultura">Cultura</Link></li>
                    <li><Link to="/medioambiente">Medio ambiente</Link></li>
                </ul>
                <ul>
                    <h2>Redes</h2>
                    <li><a target="_blank" href="https://twitter.com/envilonews" rel="noopener noreferrer">Twitter</a></li>
                    <li><a target="_blank" href="https://www.instagram.com/envilonews/?hl=es-la" rel="noopener noreferrer">Instagram</a></li>
                    <li><a target="_blank" href="https://www.linkedin.com/in/garcialucianag/" rel="noopener noreferrer">Linkedin</a></li>
                </ul>
                <p><a target="_blank" href="https://www.linkedin.com/in/federico-garc%C3%ADa-088917236/" rel="noopener noreferrer">© Federico Garcia 2023</a></p>
            </section>
            <form id="formContacto" action="https://formsubmit.co/federicoignaciogarcia@gmail.com" method="POST">
                <h2>Contactanos</h2>
                <input type="text" name="name" placeholder='Nombre' required autoComplete="off" />
                <input type="text" name="email" placeholder='Email' required autoComplete="off" />
                <p>
                    <span className="textarea" placeholder='Descripcion' role="textbox" required contentEditable></span>
                </p>
                <button>Enviar</button>
            </form>
        </div>
    )
}

export default Footer
