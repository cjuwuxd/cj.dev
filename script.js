

/* theme changer */

const themebtn = document.getElementById("theme");

if(localStorage.getItem("theme")== "dark"){
    document.body.classList.add("dark");
}

function changeTheme() {
    document.body.classList.toggle("dark");
    console.log("hi")
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
    }else{
        localStorage.setItem("theme","light");
    }
}



/* hamburger sidebar */

var hamburgeractive = false

function openHamburger() {

    if (!hamburgeractive) {
        document.getElementById("hamburgerbar").style.width = "250px";
        hamburgeractive = true
    } else {
        document.getElementById("hamburgerbar").style.width = "0px";
        hamburgeractive = false
    }
   
    
}

function closeHamburger(){
    document.getElementById("hamburgerbar").style.width = "0px";
}

/* popup window for settings */

var settingsWindow = document.getElementById("settings-modal");
var openSettings = document.getElementById("openSettings");
var span = document.getElementById("close");

openSettings.onclick = function(){
    settingsWindow.style.display = "block"
}

span.onclick = function(){
    settingsWindow.style.display = "none"
}

window.onclick = function(event){
    if (event.target==settingsWindow){
        settingsWindow.style.display = "none";
    }
}