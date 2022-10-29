import { useContext } from "react";
import moment  from 'moment';
import { useEffect,useState } from "react";
import { UserContext } from "../Context/UserProvider";
import { useFirestore } from "../hook/useFirestore";
import { AiFillHeart } from "react-icons/ai";

const StoriesPage = () => {
  const {data,loading,getData,sendData,uploadimg,error,deleteData,editData}=useFirestore()
  const {user}=useContext(UserContext)
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
 
  const handleSubmit=async(e)=>{
   e.preventDefault()
   debugger;
   await sendData(text,file)
   setText("")
   document.getElementById("input").value = "";
   
   //console.log(moment(data[0].date.toDate(),'YYYY-MM-DD hh:mm:ss'))
 }
 const handledelete =async(nanoid)=>{
    await deleteData(nanoid)
 }
 const handlelike =async(nanoid,like)=>{
  await editData(nanoid,like)
  //console.log(like)
  
  //console.log(moment(data[0].date.toDate(),'YYYY-MM-DD hh:mm:ss'))
}
const formatdate =(date)=>{
  const dateformat=moment(date.toDate()).format('YYYY-MM-DD hh:mm:ss')
  console.log("entro a formatdate")
  return dateformat;
}

  useEffect(()=>{
      getData()
  },[])

  useEffect(()=>{
    // console.log('cambio data')
  },[data])

  if(loading.getdata) return <p>{
    //console.log('si salio')
    }Cargando Publicaciones get data</p>
  if(error) return <p>{error}</p>
  return (
    <>
      <div className="mx-auto px-4 mt-6">
        <form className="form" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-md shadow-gray-700 p-5">
            <div className="flex mb-1">
              <textarea
                className="rounded-md p-3 border-solid border-2 border-slate-200"
                rows="2"
                cols="300"
                placeholder="Qué estas pensando?"
                value={text}
                onChange={(e)=>setText(e.target.value)}
              ></textarea>
            </div>
            <div className="flex buttons">
              <div className="file-select">
                <label className="ml-auto whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 mt-5 cursor-pointer">
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  name="photo"
                  id="input"
                  onChange={e=>setFile(e.target.files[0])}
                />Sube una Foto</label>
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
      <div className="py-12 px-auto md:mx-12 lg:mx-10">
        <h1 className="text-center">Publicaciones</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {
        data.map((item)=>(
          <div key={item.nanoid} className='bg-slate-800 rounded-lg overflow-hidden'>
            <img src={item.photo} className="w-full h-96 md:h-48 object-scale-down bg-white"/>
            <div className='text-gray-300 p-5 w-full '>
              <img className="inline h-8 w-8 rounded-2xl mr-1" src={user.photoURL}/>
              <h3 className='text-lg md:text-xl mb-2 md:mb-3 font-semibold inline '>Usuario: {user.displayName}</h3>
              {/* <p>{formatdate(item.date)}</p> */}
              <p className='flex flex-wrap gap-2 flex-row items-center justify-start text-xs md:text-sm'>dice:</p>
              <span className="block px-2 py-1 hover:bg-green-400 bg-slate-900">{item.comment}</span>
              <div className='text-white flex flex-wrap gap-2 flex-row items-center place-content-around text-xs md:text-sm py-1 px-1 mt-3'>
                  <a className='rounded-md bg-slate-700  hover:bg-rose-500 dark:md:hover:bg-rose-600 p-2 active:bg-rose-600'onClick={()=>handlelike(item.nanoid,item.like)}><AiFillHeart className="w-7 h-7 text-center"/></a>
                  <a className='rounded-md bg-rose-900 px-4 py-2 hover:bg-rose-600 dark:md:hover:bg-rose-600' target="_blank" onClick={()=>handledelete(item.nanoid)}>Eliminar </a>
              </div>
            </div>
          </div>
          // <div className="">
          //   <div key={item.nanoid} className="card flex flex-col lg:flex-row mx-10 md:mx-20 lg:mx-52 rounded-lg">
          //     <img className="thumbnail" width="400" height="300"src={item.photo} />
          //     <div>
          //       <img className="inline h-8 w-8" src={user.photoURL}/>
          //       <h4 className="inline mt-1 font-semibold text-lg leading-tight truncate"> Usuario: {user.displayName} </h4>
          //       <p>dice: {item.comment}</p>
          //         <div className="p-2">
          //           <label className="border rounded-md text-xl pb-3">0</label>
          //           <button onClick={() =>likehandle(item.uid)}><AiFillHeart className="w-7 h-7 text-center pt-2"/></button>
          //           <label className="border  rounded-md text-xl pb-3">Me gusta</label>
          //         </div>
          //       <hr className="my-6 border-x-gray-300 w-full"/>
          //     </div>
          //   </div>
          // </div>
        ))
      }
      </div>
      </div>
      </div>
    </>
  );
};

export default StoriesPage;
