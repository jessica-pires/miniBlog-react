//configuracao do  firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBLYFORsItjIxqtxfJ3VX-kSIsonRuU5NM",
    authDomain: "miniblog-test.firebaseapp.com",
    projectId: "miniblog-test",
    storageBucket: "miniblog-test.firebasestorage.app",
    messagingSenderId: "537036463058",
    appId: "1:537036463058:web:6f930eaf621b962d2e460b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db, app}