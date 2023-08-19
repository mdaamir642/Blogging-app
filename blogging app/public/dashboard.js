
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs,deleteDoc,doc,updateDoc  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";


const firebaseConfig = {

  apiKey: "AIzaSyCZuByuO7e6NHA8_8qqCC0jge9avMqyxj0",

  authDomain: "blogging-app-42eac.firebaseapp.com",

  projectId: "blogging-app-42eac",

  storageBucket: "blogging-app-42eac.appspot.com",

  messagingSenderId: "984050474424",

  appId: "1:984050474424:web:5d3bbc94b9caba6f95034d"

};
var publishBtn = document.getElementById("publishBtn");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


var blogs = document.getElementById("material");
var listItem = document.createElement("li");
publishBtn.addEventListener("click", publish);

async function publish() {
  if(!title.value && !desc.value){
    alert("input fields firsts")
  }
  
  if(title.value && desc.value){

 

    try {
        const title = document.getElementById("title").value;
        const desc = document.getElementById("desc").value;
        const date = new Date();
        const postDate = `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
    
        const posts = {
          title: title,
          desc: desc,
          postDate: postDate,
        };
    
        const docRef = await addDoc (collection(db, "posts"), posts);
        console.log("Document written with ID: ", docRef.id);
    
        // listItem.innerHTML = `<div class="blogs">
        //   <img src="blank-profile-picture-973460_640.webp" alt="">
        //   <h3>${title}</h3>
        //   <span>Name</span> <span>${postDate}</span>
        //   <p>${desc}</p>
        //   <button class="delBtn">Delete</button>
        //   <button class="editBtn">Edit</button>
        // </div>`;
    
        // var editBtn = listItem.querySelector(".editBtn");
        // var delBtn = listItem.querySelector(".delBtn");
        // delBtn.addEventListener("click", deletePost);
        // editBtn.addEventListener("click", editPost);
    
        // blogs.appendChild(listItem);
    
        createUI(title, desc, postDate);
        title.value = "";
        desc.value = "";
      } catch (error) {
        console.log('error', error.message);
      }



}
  
}

window.addEventListener("load", getPost)

async function getPost() {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach(function (doc) {
        const allPosts = doc.data();
        createUI(allPosts.title, allPosts.desc, allPosts.postDate);
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  
  async function deletePost(event) {
    const listItem = event.target.closest(".blogs");
    const li = event.target.parentNode;

   const postId = listItem.dataset.postId;
   try {
    await deleteDoc(doc(db,"posts",postId));
    li.remove();
   } catch (error) {
    console.log(error.message);
   }
   
   






}
async function editPost(event) {
    const listItem = event.target.closest(".blogs");
    const postId = listItem.dataset.postId; 
  
    const editedTitle = prompt("Edit title:", listItem.querySelector("h3").textContent);
    const editedDesc = prompt("Edit description:", listItem.querySelector("p").textContent);
  
    if (editedTitle !== null && editedDesc !== null) {
      const postRef = doc(db, "posts", postId);
      const newData = {
        title: editedTitle,
        desc: editedDesc,
      };
  
      try {
        await updateDoc(postRef, newData);
        console.log("Document successfully updated!");
      
        listItem.querySelector("h3").textContent = editedTitle;
        listItem.querySelector("p").textContent = editedDesc;
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  }
  

  
  function createUI(title, desc, postDate, postId) {
    const listItem = document.createElement("li");
    listItem.dataset.postId = postId; 
  
    const postUI = `<div class="blogs" data-post-id="${postId}">
      <img src="blank-profile-picture-973460_640.webp" alt="">
      <h3>${title}</h3>
      <span>Name</span> <span>${postDate}</span>
      <p>${desc}</p>
      <button class="delBtn">Delete</button>
      <button class="editBtn">Edit</button>
    </div>`;
  
    listItem.innerHTML = postUI;
    blogs.appendChild(listItem);
  
    const editBtn = listItem.querySelector(".editBtn");
    const delBtn = listItem.querySelector(".delBtn");
    delBtn.addEventListener("click", deletePost);
    editBtn.addEventListener("click", editPost);
  }