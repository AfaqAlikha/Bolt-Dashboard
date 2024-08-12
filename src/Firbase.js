// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAevr3KLVjLeOhiG0bDi0Wr03iSgmpPrIU",
//   authDomain: "bolt-4ea51.firebaseapp.com",
//   databaseURL: "https://bolt-4ea51-default-rtdb.firebaseio.com",
//   projectId: "bolt-4ea51",
//   storageBucket: "bolt-4ea51.appspot.com",
//   messagingSenderId: "748358736526",
//   appId: "1:748358736526:web:4e1b6e4ae961e32d38c7df",
//   measurementId: "G-MEET6EH3E6"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAG2Bh6HlM8ptlVa9l6o_OLrZy3hf4mE1k",
  authDomain: "bolt-6c76c.firebaseapp.com",
  projectId: "bolt-6c76c",
  storageBucket: "bolt-6c76c.appspot.com",
  messagingSenderId: "838167418829",
  appId: "1:838167418829:web:4b2594c4947ee98fb5d684",
  measurementId: "G-8XRTLFJ2C9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (if needed)
const analytics = getAnalytics(app);

export { app, analytics };
