
import { auth } from "./firebase-init.js";

import {onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


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
