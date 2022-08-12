// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb_CYC0w_hB-t2mbpfWO9hrdYeGgEpVd4",
  authDomain: "e-commerce-dbeba.firebaseapp.com",
  projectId: "e-commerce-dbeba",
  storageBucket: "e-commerce-dbeba.appspot.com",
  messagingSenderId: "676137080312",
  appId: "1:676137080312:web:b15388e2b6e68eda2d720d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    'prompt': 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);