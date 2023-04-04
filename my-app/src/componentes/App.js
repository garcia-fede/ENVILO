import {BrowserRouter,Routes,Route,useLocation} from "react-router-dom"
import '../componentes/styles.css'
import Editor from "./Editor"
import NavBar from './NavBar'
import LandingNoticias from './LandingNoticias'
import Auth from './Auth'
import NoticiasListContainer from './NoticiasListContainer'
import NoticiaDetalleContainer from './NoticiaDetalleContainer'
import MiProvider from "./Context"
import RutaPrivada from "./RutaPrivada"
import Footer from "./Footer"
import Update from "./Update"

const App = () => {

    return (
    <>
        <MiProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<LandingNoticias />} />
                    <Route path="/:categoria" element={<NoticiasListContainer />} />
                    <Route path="noticia/:noticia" element={<NoticiaDetalleContainer />} />
                    <Route path="noticia/:noticia/editar" element={
                        <RutaPrivada>
                            <Update />
                        </RutaPrivada>
                    } />
                    <Route path="/Login" element={<Auth />} /> 
                    <Route path="NoticiaNueva" element={
                        <RutaPrivada>
                            <Editor />
                        </RutaPrivada>
                    }/>
                    {/* <Route path="Edit/" element={<Update />} /> */}
                </Routes>   
                <Footer />
            </BrowserRouter>
        </MiProvider>
    </>
    )
}

export default App