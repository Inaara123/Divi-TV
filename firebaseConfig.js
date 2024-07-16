// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCg5dn7ZVoFYNlMmelo0JC0W-bCZub-CHg",
    authDomain: "divitv-ff2ca.firebaseapp.com",
    databaseURL: "https://divitv-ff2ca-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "divitv-ff2ca",
    storageBucket: "divitv-ff2ca.appspot.com",
    messagingSenderId: "605765915392",
    appId: "1:605765915392:web:2bf75bd48c60634e4319e5",
    measurementId: "G-8ZGNVZDYJP"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
