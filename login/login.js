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

// Get references to your form and button
const loginForm = document.querySelector('.login');
const loginBtn = document.querySelector('.log');

if (loginForm && loginBtn) { // Ensure elements exist before adding event listeners
    loginBtn.addEventListener('click', async (e) => { 
        e.preventDefault();

        
        const email = loginForm.querySelector('input[name="username"]').value; 
        const password = loginForm.querySelector('input[name="psw"]').value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            const user = userCredential.user;
            console.log("Admin signed in:", user.email);
            window.location.href = "admin-dashboard.html"; 
        } catch (error) {
            alert("Access Denied: " + error.message);
            console.error("Sign-in error:", error);
        }
    });
} else {
    console.error("Login form or button not found in the DOM.");
}


import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        
        if (window.location.pathname !== "/admin-dashboard.html") { 

            document.body.classList.add('admin-mode');
            console.log("User already signed in:", user.email);
            window.location.href = "admin-dashboard.html";
        }
    } else {
        document.body.classList.add('admin-mode');
        console.log("User is signed out.");
        
        
        if (window.location.pathname === "/admin-dashboard.html") {
            
        }
    }
});



