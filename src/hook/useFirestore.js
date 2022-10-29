import { addDoc, collection, getDocs, orderBy, query, where,doc,setDoc, serverTimestamp, deleteDoc, updateDoc } from "firebase/firestore/lite"
import {  useState } from "react"
import { auth, db,storage } from "../firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { nanoid } from 'nanoid'

export const useFirestore = () => {

    const [data,setData]=useState([])
    const [error,setError]=useState()
    const [loading,setLoading]=useState({})
    const fechaPublicacion = new Date();

    const getData= async()=>{
        
        try {
            setLoading(prev=>({...prev, getdata:true}))
            const dataRef=collection(db,"publicaciones")
            const filtro=query(dataRef,where("uid","==",auth.currentUser.uid,orderBy("timestamp")))
            const querySnapshot = await getDocs(filtro)
            const dataFB=querySnapshot.docs.map(doc=>(doc.data()))
            
            setData(dataFB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally{
            setLoading(prev=>({...prev, getdata:false}))
            console.log(data)
        }
    }
    const sendData = async(publicacion,archivo)=>{
        try {
            setLoading(prev=>({...prev, sendata:true}))
            const result= await uploadimg(archivo)
            console.log(result)
            try {
                console.log(result)
            } catch (error) {
                setError(error.message)
            }
            const newDoc={
                nanoid:nanoid(6),
                comment:publicacion,
                date:serverTimestamp(),
                photo:result,
                like:false,
                uid:auth.currentUser.uid
            }
            const docRef=doc(db,"publicaciones",newDoc.nanoid)
            await setDoc(docRef,newDoc)
            //const docRef= collection(db,"publicaciones")
            //await addDoc(docRef,newDoc)
            setData([...data,newDoc])
            //console.log(newDoc.id)
            //console.log(data)
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(prev=>({...prev, sendata:false}))
        }
    }
    const uploadimg= async(file)=>{
        const imagesRef=ref(storage,'Fotos')
        const storageRef=ref(imagesRef,nanoid())
        await uploadBytes(storageRef,file)
        const url=await getDownloadURL(storageRef)
        return url
    }
    const deleteData =async(nanoid)=>{
        try {
            const docRef=doc(db,"publicaciones",nanoid)
            await deleteDoc(docRef)
            setData(data.filter((item)=>item.nanoid !==nanoid))
        } catch (error) {
            console.log(error)
        }
    }
    const editData =async(nanoid,likes)=>{
        try {
            const docRef=doc(db,"publicaciones",nanoid)
            await updateDoc(docRef,{like:!likes})
        } catch (error) {
            console.log(error)
        }
    }
  return {
    data,error,loading,getData,sendData,uploadimg,deleteData,editData,
  }  
}
