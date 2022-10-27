import { useContext } from "react";
import { useEffect,useState } from "react";
import { UserContext } from "../Context/UserProvider";
import { useFirestore } from "../hook/useFirestore";
import { AiFillHeart } from "react-icons/ai";

const StoriesPage = () => {
  const {data,loading,getData,sendData,uploadimg}=useFirestore()
  const {user}=useContext(UserContext)
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
 
  const handleSubmit=async(e)=>{
   e.preventDefault()
   await sendData(text,file)
   setText("")
   console.log(data)
 }

  useEffect(()=>{
      getData()
  },[])

  if(loading) return <p>Cargando Publicaciones</p>
  return (
    <>
      
      <div className="mx-auto px-4 mt-6">
        <form className="form" onSubmit={handleSubmit}>
        <div className="form-story rounded-md shadow-md shadow-gray-300 p-5">
          <div className="flex mb-1">
            <textarea
              className="rounded-md p-3 border-solid border-2 border-slate-200"
              rows="3"
              cols="300"
              placeholder="Qué estas pensando?"
              value={text}
              onChange={(e)=>setText(e.target.value)}
            ></textarea>
          </div>
          <div className="flex buttons">
            <div className="file-select">
              <input
                type="file"
                accept="image/*"
                name="photo"
                id="input"
                onChange={e=>setFile(e.target.files[0])}
              />
            </div>
            <button
              type="submit"
              className="ml-auto whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 mt-5"
            >
              Publicar
            </button>
          </div>
        </div>
      </form>
      <div className="list-stories">
      Historias
      {
        data.map((item,index)=>(
          <div key={index} >
            <div className="bg-slate-100 border rounded-lg overflow-hidden h-2/3 w-2/3 m-auto">
            <img className="h-2/3 w-full object-cover" src={item.photo} />
            <img className="inline h-8 w-8" src={user.photoURL}/>
            <h4 className="inline mt-1 font-semibold text-lg leading-tight truncate"> Usuario: {user.displayName} </h4>
            <p>dice: {item.comment}</p>
            <div className="p-2">
            <label className="border rounded-md text-xl pb-3">0</label>
            <button onClick={() =>likehandle(item.uid)}><AiFillHeart className="w-7 h-7 text-center pt-2"/></button>
            <label className="border  rounded-md text-xl pb-3">Me gusta</label>
            </div>
            </div>
            <hr className="my-6 border-x-gray-300 w-full"/>
          </div>
        ))
      }
      </div>
      </div>
    </>
  );
};

export default StoriesPage;
