import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = JSON.parse(import.meta.env.VITE_BACKEND_FBCONFIG)

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export{auth};