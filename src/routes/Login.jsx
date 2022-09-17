import { useContext } from "react"
import { UserContext } from "../Context/UserProvider"

const Login=()=>{
const {user,setUser}=useContext(UserContext)
    return(
        <>
            <h1>Login</h1>
            <h2>{user ? "Conectado": "No Conectado"}</h2>
            <button onClick={()=>setUser(true)}>Acceder</button>
        </>
    )
}
export default Login