import {Link} from 'react-router-dom'
const Navbar =()=>{
    return(
        <div>
            <Link to="/">Inicio</Link>
            <Link to="/Login">Login</Link>
        </div>
    );
};
export default Navbar