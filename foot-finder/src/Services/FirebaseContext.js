import {getStorage} from 'firebase/storage';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAq1K4KIP1NhgGggDBnN0NfjuSevKvu2kI",
  authDomain: "food-finder-7ec9c.firebaseapp.com",
  projectId: "food-finder-7ec9c",
  storageBucket: "food-finder-7ec9c.appspot.com",
  messagingSenderId: "170935225543",
  appId: "1:170935225543:web:f3239851bbe470c0e402e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

