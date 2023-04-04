import { useState, useContext } from "react"
import Axios from 'axios'
import { contexto } from "./Context"
import { useNavigate } from "react-router-dom"
import LOGO from "../imagenes/LOGO.png"

const Auth = () =>{

    const [usuario,setUsuario] = useState("")
    const [contraseña,setContraseña] = useState("")
    const {login,setLogin} = useContext(contexto)
    const navegar = useNavigate()

    document.title = "Admin";

    const verificarUsuario = ()=>{
        if(usuario!=""&&contraseña!=""){
            Axios.post("https://envilo.com.ar/api/login",{
                usuario: usuario, 
                contraseña: contraseña
            }).then((result)=>{
                if(result.data!=""){
                    setLogin(true)
                    localStorage.setItem("logueado",true)
                    navegar("/")
                }
                else{
                    alert("Los datos ingresados no son validos")
                }
            }).catch(()=>{
                alert("Hubo un error al verificar")
            })
        }
        else{
            alert("Complete todos los campos")
        }
        
    }

    return(
        <>
            <div className="login">
                <div>
                    <label>Usuario</label>
                    <input type="text"
                    name="Usuario"
                    onChange={(e)=>{
                        setUsuario(e.target.value)
                    }}/>
                    
                    <label>Contraseña</label>
                    <input 
                    type="password"
                    name="Contraseña"
                    onChange={(e)=>{
                        setContraseña(e.target.value)
                    }}/>
                    
                    <button onClick={verificarUsuario} >Login</button>
                </div>
                <img src={LOGO} alt="logo" />
            </div>
        </>
    )
}

export default Auth