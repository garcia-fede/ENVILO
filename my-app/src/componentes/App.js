import {BrowserRouter,Routes,Route,useLocation} from "react-router-dom"
import '../componentes/styles.css'
import Editor from "./Editor"
import NavBar from './NavBar'
import LandingNoticias from './LandingNoticias'
import Auth from './Auth'
import NoticiasListContainer from './NoticiasListContainer'
import NoticiaDetalleContainer from './NoticiaDetalleContainer'
import Update from "./Update"
import MiProvider from "./AuthContext"
import RutaPrivada from "./RutaPrivada"

const App = () => {

    return (
    <>
        <MiProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<LandingNoticias />} />
                    <Route path="Categoria/:categoria" element={<NoticiasListContainer />} />
                    <Route path="Noticia/:idnoticia" element={<NoticiaDetalleContainer />} />
                    <Route path="/Login" element={<Auth />} />
                    
                    <Route path="NoticiaNueva" element={
                        <RutaPrivada>
                            <Editor />
                        </RutaPrivada>
                    }/>
                    {/* <Route path="Edit/" element={<Update />} /> */}
                </Routes>   
            </BrowserRouter>
        </MiProvider>
    </>
    )
}

export default App