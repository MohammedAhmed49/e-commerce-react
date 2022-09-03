// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

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

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data());
}

export const createUserDocumentFromAuth = async (userAuth, additionalData) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userSnapshot;
}

export const customSignIn = async (email, password) => {
  console.log(email);
  if (!email || !password) return;
  
  try {
    const userCreds = await signInWithEmailAndPassword(auth, email, password);
    return(userCreds.user);
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      alert('Incorrect password!');
    } else if(error.code === 'auth/user-not-found') {
      alert('Incorrect email!');
    } else {
      alert('Something went wrong!');
    }
  }
}

export const createUser = async (email, password) => {
  console.log(email, password);
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const customSignOut = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
      unsubscribe();
      resolve(userAuth);
    },
    reject
    );
  })
}
