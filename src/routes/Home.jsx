import Navbar from "../components/Navbar"
import ModalBienvenido from "../Modal/ModalBievenido"
import StoriesPage from "./../components/StoriesPage"


const Home=()=>{
    return(
        <div className="max-w-5xl mx-auto w-11/12 bg-slate-900">
            <Navbar />
            <ModalBienvenido />
            <StoriesPage />
        </div>
    )
}
export default Home