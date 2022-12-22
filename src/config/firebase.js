import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

//Firebase configs
const firebaseConfig = {
   // apikey: Constants.manifest.extra.apikey,
   // authDomain: Constants.manifest.extra.authDomain,
   // projectId: Constants.manifest.extra.projectId,
   // storageBucket: Constants.manifest.extra.storageBucket,
   // messagingSenderId: Constants.manifest.extra.messagingSenderId,
   // appId: Constants.manifest.extra.appId
   ...Constants.manifest.extra
};

// console.log(JSON.stringify({...Constants.manifest.extra}));

//initializing firebase

initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
