import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../Context/UserProvider"

const Register = () => {

  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')
  
  const navegate=useNavigate()

  const {registerUser} = useContext(UserContext)
  
  const handleSubmit =async(e) =>{
    e.preventDefault();
    console.log('procesando form : ',email,password)
    try{
        await registerUser(email,password)
        console.log("Usuario Creado")
        navegate("/")
    } catch(error){
        console.log(error)
    }
  }  
  
  return (
    <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}> 
            <input type="email" placeholder ="Ingrese Email" onChange={e=>setEmail(e.target.value)} />
            <input type="password" placeholder ="Ingrese Contraseña" onChange={e=>setPassword(e.target.value)} />
            <button type="submit">Registrar</button>
        </form>
    </>
  )
}

export default Register