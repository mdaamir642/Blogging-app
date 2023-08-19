// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

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

console.log(auth)
const loginBtn = document.getElementById("loginBtn")
loginBtn.addEventListener("click", login)
async function login(){
try {
  
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
 
 
 const user = await signInWithEmailAndPassword(auth, email,password )

 
 console.log(user)
 
 
 window.location.replace("./dashboard.html")

} catch (error) {
console.log("error", error.message)  
alert(error.message)
}

console.log(email.value , password.value)



}