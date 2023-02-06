import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { contexto } from './AuthContext'

const RutaPrivada = ({children}) => {
    const { login } = useContext(contexto)
    console.log("Login: ", login )
    return login ? children : <Navigate to="/login" />
}

export default RutaPrivada
