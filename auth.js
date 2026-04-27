import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js"; // <--- ADDED signInWithEmailAndPassword import

// IMPORTANT: Replace these with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAW-6NCS9L3QbQ56_uol3A6aQ_0j8kcmT8",
    authDomain: "cj-dev-site.firebaseapp.com",
    projectId: "cj-dev-site",
    storageBucket: "cj-dev-site.firebasestorage.app",
    messagingSenderId: "535562736903",
    appId: "1:535562736903:web:655fa7e0a3c72c76d761a2",
    measurementId: "G-VVK222WWD0"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

let loginbtn = document.getElementById("loginBTN");
let myLogo = document.getElementById("mainbutton");
onAuthStateChanged(auth, (user) => {
    if (user) {
        
        if (window.location.pathname !== "/admin-dashboard.html") { 
            //change button mode
            loginbtn.textContent = "hi cj!";
            loginbtn.addEventListener("mouseenter" ,() =>{
                loginbtn.textContent = "logout";
            });

            loginbtn.addEventListener("mouseleave" ,() =>{
                loginbtn.textContent = "hi cj!";
            });


            //toggle on to admin mode
            document.body.classList.add('admin-mode');
            console.log("User already signed in:", user.email);
            
        }
    } else {
        

        //toggle off admin mode
        document.body.classList.remove('admin-mode');
        console.log("User is signed out.");
        
        
        if (window.location.pathname === "/admin-dashboard.html") {
            
        }
    }
});
