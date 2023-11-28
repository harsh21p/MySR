// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHzvqmt86A95mAI4EmmKTdoOokK_pW8-4",
  authDomain: "mysr-77db3.firebaseapp.com",
  projectId: "mysr-77db3",
  storageBucket: "mysr-77db3.appspot.com",
  messagingSenderId: "1012092516256",
  appId: "1:1012092516256:web:f8fc98337b69165ba096c5",
  measurementId: "G-Z4VKF63ZPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app