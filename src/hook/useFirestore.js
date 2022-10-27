import { addDoc, collection, getDocs, query, where } from "firebase/firestore/lite"
import {  useState } from "react"
import { auth, db,storage } from "../firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { nanoid } from 'nanoid'

export const useFirestore = () => {

    const [data,setData]=useState([])
    const [error,setError]=useState()
    const [loading,setLoading]=useState(false)
    const [loadingimg,setLoadingimg]=useState(false)

    const getData= async()=>{
        try {
            setLoading(true)
            const dataRef=collection(db,"publicaciones")
            const filtro=query(dataRef,where("uid","==",auth.currentUser.uid))
            const querySnapshot = await getDocs(filtro)
            const dataFB=querySnapshot.docs.map(doc=>({id:doc.id,...doc.data()}))
            setData(dataFB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally{
            setLoading(false)
        }
    }
    const sendData = async(publicacion,archivo)=>{
        try {
            setLoading(true)
            const result= await uploadimg(archivo)
            console.log(result)
            try {
                console.log(result)
            } catch (error) {
                setError(error.message)
            }
            const newDoc={
                comment:publicacion,
                photo:result,
                like:0,
                uid:auth.currentUser.uid
            }
            //const docRef=doc(db,"publicaciones","")
            //await setDoc(docRef,newDoc)
            const docRef= collection(db,"publicaciones")
            await addDoc(docRef,newDoc)
            setData([...data,newDoc])
            console.log(newDoc.id)
            console.log(data)
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }
    const uploadimg= async(file)=>{
        const imagesRef=ref(storage,'Fotos')
        const storageRef=ref(imagesRef,nanoid())
        await uploadBytes(storageRef,file)
        const url=await getDownloadURL(storageRef)
        return url
    }
  return {
    data,error,loading,getData,sendData,uploadimg,
  }  
}
