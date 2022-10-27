import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
import { getStorage } from "firebase/storage";

const firebaseConfig = JSON.parse(import.meta.env.VITE_BACKEND_FBCONFIG)

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db=getFirestore(app)
const storage=getStorage(app)

export{auth,db,storage};