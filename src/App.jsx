import { useContext } from 'react';
import {Routes,Route} from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import { UserContext } from './Context/UserProvider';
import Home from './routes/Home';
import Login from "./routes/Login"
import Register from './routes/Register';
const App=()=> {

  const {user}=useContext(UserContext);
  if(user===false){
    return <p>Esperando...FireBase</p>;
  }

  return (
    <div className='bg-slate-900'>
        <Routes>
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  );
}

export default App
