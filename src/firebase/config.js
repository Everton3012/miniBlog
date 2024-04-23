import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkdQAYXyFV6ijAvge-QeSXBs93jdXBOTA",
  authDomain: "miniblog-ee3cb.firebaseapp.com",
  projectId: "miniblog-ee3cb",
  storageBucket: "miniblog-ee3cb.appspot.com",
  messagingSenderId: "303503201150",
  appId: "1:303503201150:web:876c77762593f3d1cc592f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};