import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD3whCft4JI05SkuJUPkLHLhKpLHZHzveo",
  authDomain: "finalwork-3bb4c.firebaseapp.com",
  projectId: "finalwork-3bb4c",
  storageBucket: "finalwork-3bb4c.firebasestorage.app",
  messagingSenderId: "462049401835",
  appId: "1:462049401835:web:4ca6900f799d0538e557ae"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);