
import {auth} from './firebase-init.js';

import {signInWithEmailAndPassword,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"; 
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



