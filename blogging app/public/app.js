// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCZuByuO7e6NHA8_8qqCC0jge9avMqyxj0",

  authDomain: "blogging-app-42eac.firebaseapp.com",

  projectId: "blogging-app-42eac",

  storageBucket: "blogging-app-42eac.appspot.com",

  messagingSenderId: "984050474424",

  appId: "1:984050474424:web:5d3bbc94b9caba6f95034d"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

console.log(auth)
const signup = document.getElementById("signupBtn")
signup.addEventListener("click", signin)
async function signin(){
try {
  
const firstName = document.getElementById("firstNam");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
 
 
 const user = await createUserWithEmailAndPassword(auth, email,password )

 
 console.log(user)
 window.location.replace("./login.html")
 
 

} catch (error) {
console.log("error", error.message)  
alert(error.message)
}


}