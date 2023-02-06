import { useState, useContext } from "react"
import Axios from 'axios'
import { contexto } from "./AuthContext"
import { Navigate } from "react-router-dom"
const Auth = () =>{

    const [usuario,setUsuario] = useState("")
    const [contraseña,setContraseña] = useState("")
    const {login,setLogin} = useContext(contexto)

    const verificarUsuario = ()=>{
        if(usuario!=""&&contraseña!=""){
            Axios.post("http://localhost:3001/api/login",{
                usuario: usuario, 
                contraseña: contraseña
            }).then((result)=>{
                if(result.data!=""){
                    console.log(result.data)
                    console.log("Antes del setLogin: ",login)
                    setLogin(true)
                    localStorage.setItem("logueado",true)
                    console.log("Despues del setLogin: ",login)
                    return <Navigate to="/" />
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
        </>
    )
}

export default Auth