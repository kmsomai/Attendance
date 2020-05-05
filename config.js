import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA9yMJ3nRXQK-dRLKtftwnwjO0MtLzE58U",
  authDomain: "attendance-fa1ac.firebaseapp.com",
  databaseURL: "https://attendance-fa1ac.firebaseio.com",
  projectId: "attendance-fa1ac",
  storageBucket: "attendance-fa1ac.appspot.com",
  messagingSenderId: "778750889649",
  appId: "1:778750889649:web:1db8bc879bba8f1fecdc90",
  measurementId: "G-XJY6VPT9YF"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();
