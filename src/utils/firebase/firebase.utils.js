import {initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBDlqDg6wgVC1CFOENAMBqNm6SieOEmB6o",
    authDomain: "crwn-clothing-db-e650a.firebaseapp.com",
    projectId: "crwn-clothing-db-e650a",
    storageBucket: "crwn-clothing-db-e650a.appspot.com",
    messagingSenderId: "794885297562",
    appId: "1:794885297562:web:e04cbf19f3e47878ae1623"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;

}

