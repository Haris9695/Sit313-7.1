import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword }from 'firebase/auth'
import {getFiretore, doc, getDoc,setDoc, getFirestore} from 'firebase/firestore'




const firebaseConfig = {
    apiKey: "AIzaSyBNzoI5_fym_uMAdgWp6KKzALX7M3SMWvE",
    authDomain: "devlink-web-app-90aa6.firebaseapp.com",
    projectId: "devlink-web-app-90aa6",
    storageBucket: "devlink-web-app-90aa6.appspot.com",
    messagingSenderId: "982421361750",
    appId: "1:982421361750:web:22e52a5c5a253c18b857f7",
    measurementId: "G-PMCWCHBPWV"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({

    prompt:"select_account"
  })

  export  const auth = getAuth();
  export function SignInWithGooglePopup() {
    return signInWithPopup(auth, provider);
}
  export const db = getFirestore();



  export const createUserDocFromAuth= async (userAuth, additionalInformation ={}) =>{
    if (!userAuth.email)return;



    const userDocRef= doc  (db,'users',userAuth.uid);

    

const userSnapshot= await getDoc(userDocRef);



if (! userSnapshot.exists()){

    const {displayName, email} = userAuth
    const createdAt = new Date();


try {

await setDoc(userDocRef,  {

    displayName,
    email,
    createdAt,
    ... additionalInformation

})

}
catch(error) 

{
console.log('error in creating', error.message)

}
return userDocRef;

  } 
}

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;
  return await  createUserWithEmailAndPassword(auth, email, password)

}