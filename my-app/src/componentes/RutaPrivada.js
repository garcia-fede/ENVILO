import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { contexto } from './Context'

const RutaPrivada = ({children}) => {
    const { login } = useContext(contexto)
    return login ? children : <Navigate to="/login" />
}

export default RutaPrivada
