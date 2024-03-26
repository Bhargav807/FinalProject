// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBZ1cy_B7fmAWHdPA6QIQzjIWGkBvMoxDY",
//   authDomain: "otp-project-feb20.firebaseapp.com",
//   projectId: "otp-project-feb20",
//   storageBucket: "otp-project-feb20.appspot.com",
//   messagingSenderId: "765547595784",
//   appId: "1:765547595784:web:ef18151f2a3987fdb329bd",
//   measurementId: "G-NGGPLSNH9Y"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZ1cy_B7fmAWHdPA6QIQzjIWGkBvMoxDY",
  authDomain: "otp-project-feb20.firebaseapp.com",
  projectId: "otp-project-feb20",
  storageBucket: "otp-project-feb20.appspot.com",
  messagingSenderId: "765547595784",
  appId: "1:765547595784:web:ef18151f2a3987fdb329bd",
  measurementId: "G-NGGPLSNH9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase authentication

export { auth };
