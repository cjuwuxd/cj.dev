import { auth } from "./firebase-init.js";
import {signOut,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// --- Logout Functionality ---
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully.");
            window.location.href = "index.html"; // Redirect to your login page (or home page)
        } catch (error) {
            console.error("Error signing out:", error);
            alert("Error logging out: " + error.message);
        }
    });
}

// --- Auth State Protection for Dashboard ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Admin dashboard accessed by:", user.email);
    } else {
        console.log("No user signed in. Redirecting to login.");
        window.location.href = "index.html"; 
    }
});