import { useContext } from 'react';
import {NavLink} from 'react-router-dom'
import { UserContext } from '../Context/UserProvider';
const Navbar =()=>{
    const {user,signOutUser}=useContext(UserContext)

    const handleClickLogout =async() =>{
        try{
            await signOutUser()
        } catch(error){
            console.log(error.code)
        }
      }  

    return(
        <div>
            {user?(
                <div className='text-white bg-slate-900 p-5 mx-5 flex justify-between items-center font-bold text-xl'>
                    <NavLink to="/">Social App</NavLink>
                    <button onClick={handleClickLogout} className="hover:text-rose-700">Cerrar Sesion</button>
                </div>
            ):(
                <>
                    <NavLink to="/Login">Login </NavLink>
                    <NavLink to="/register">Register </NavLink>               
                </>
            )}
        </div>
    );
};
export default Navbar