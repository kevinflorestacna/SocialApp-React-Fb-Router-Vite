import {Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './routes/Home';
import Login from "./routes/Login"
const App=()=> {

  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
    </>
  );
}

export default App
