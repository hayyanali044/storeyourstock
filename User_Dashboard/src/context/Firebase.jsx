import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNEotgv3QLKoLPG7Fszd7_XJdBR4pvooc",
    authDomain: "store-stock-fbc0d.firebaseapp.com",
    databaseURL: "https://store-stock-fbc0d-default-rtdb.firebaseio.com",
    projectId: "store-stock-fbc0d",
    storageBucket: "store-stock-fbc0d.appspot.com",
    messagingSenderId: "681166334206",
    appId: "1:681166334206:web:e738e3dffc27eb34331daf"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { database, storage,auth };