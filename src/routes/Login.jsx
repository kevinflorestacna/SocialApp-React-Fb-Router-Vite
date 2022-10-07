import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../Context/UserProvider"


const Login=()=>{

    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')

    const {loginUser}=useContext(UserContext);
    const navegate=useNavigate();

    const handleSubmit =async(e) =>{
        e.preventDefault();
        console.log('procesando form : ',email,password)
        try{
            await loginUser(email,password)
            console.log("Usuario logeado")
            navegate("/")
        } catch(error){
            console.log(error.code)
        }
      }  

    return(
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}> 
            <input type="email" placeholder ="Ingrese Email" onChange={e=>setEmail(e.target.value)} />
            <input type="password" placeholder ="Ingrese Contraseña" onChange={e=>setPassword(e.target.value)} />
            <button type="submit">Ingresar</button>
        </form>
        </>
    )
}
export default Login