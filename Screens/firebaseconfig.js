import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { initializeAuth, getauth, getReactNativePersistence } from 'firebase/auth';



const firebaseconfig = {
  apiKey: "AIzaSyDMfzg0z4L4QZH0sSGa3O0go6PhqF8EQuI",
  authDomain: "appdevendas-db212.firebaseapp.com",
  projectId: "appdevendas-db212",
  storageBucket: "appdevendas-db212.appspot.com",
  messagingSenderId: "819840366215",
  appId: "1:819840366215:web:ec56099c1d7ea7fda82a22"
};


export const firebase = initializeApp(firebaseconfig); 
export const auth = getAuth(firebase);  
