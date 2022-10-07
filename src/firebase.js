
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAk8Nglw-HtAeFH_LjqEI1UMDBiH6a7dVc",
  authDomain: "social-react-vite.firebaseapp.com",
  projectId: "social-react-vite",
  storageBucket: "social-react-vite.appspot.com",
  messagingSenderId: "930736823778",
  appId: "1:930736823778:web:22596356c6131645052dbb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export{auth};