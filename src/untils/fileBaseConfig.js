import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDCAj0qmyf1sa-t5jBUx2gI-QSWf1tesg",
    authDomain: "gmap-304fa.firebaseapp.com",
    databaseURL: "https://gmap-304fa-default-rtdb.firebaseio.com",
    projectId: "gmap-304fa",
    storageBucket: "gmap-304fa.firebasestorage.app",
    messagingSenderId: "751570867739",
    appId: "1:751570867739:web:6fba86de09232a0b9babe"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);