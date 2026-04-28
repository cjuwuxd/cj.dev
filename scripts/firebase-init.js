import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Import modules for side effects (component registration)
import "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Then, import specific functions
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyAW-6NCS9L3QbQ56_uol3A6aQ_0j8kcmT8",
    authDomain: "cj-dev-site.firebaseapp.com",
    projectId: "cj-dev-site",
    storageBucket: "cj-dev-site.firebasestorage.app",
    messagingSenderId: "535562736903",
    appId: "1:535562736903:web:655fa7e0a3c72c76d761a2",
    measurementId: "G-VVK222WWD0",
    databaseURL: "https://cj-dev-site-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;