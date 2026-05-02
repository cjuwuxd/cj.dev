/* hamburger sidebar */

let hamburgeractive = false;

function openHamburger() {
    
    if (!hamburgeractive) {
        document.getElementById("hamburgerbar").style.width = "250px";
        hamburgeractive = true;
    } else {
        document.getElementById("hamburgerbar").style.width = "0px";
        hamburgeractive = false;
    }
   
    
}

//TODO: FIX IMAGE UPDATE AUTOMATICALLY
function changeTheme() {
    document.body.classList.toggle("dark");
    
    if(document.body.classList.contains("dark")){
        document.getElementById("themebtn").textContent = "🔆"
        localStorage.setItem("theme","dark");
    }else{
        document.getElementById("themebtn").textContent = "🌙"
        localStorage.setItem("theme","light");
    }
}

function playSound(){
    const buttons = document.querySelectorAll('a, button');
    console.log("e")
    
    buttons.forEach(element => {
        element.addEventListener('click', () =>{
            if (localStorage.getItem("sound") == "on"){
                const click = clickSound.cloneNode(true);
                click.playbackRate = 1.5;
                click.play();
                
                click.onended = () => click.remove();
            }
        });

        element.addEventListener('mouseenter', () => {
            if (localStorage.getItem("sound") == "on"){
                const hover = hoverSound.cloneNode(true);  
                hover.playbackRate = 1.5;
                hover.play();
                
                hover.onended = () => hover.remove();
            }
        });
        
    });
}


function toggleSound(){
    const isOn = document.body.classList.toggle("on");
    document.getElementById('soundbtn').textContent = isOn ? "🔊" : "🔇";
    localStorage.setItem("sound", isOn ? "on" : "off");
}




document.addEventListener("DOMContentLoaded", function(){

// theme changer 
const themebtn = document.getElementById("theme");
const skrbl = document.getElementById("skrbl");

if(localStorage.getItem("theme")== "dark"){
    document.body.classList.add("dark");
}

if(document.body.classList.contains("dark")){
        document.getElementById("themebtn").textContent = "🔆"
        localStorage.setItem("theme","dark");
    }else{
        document.getElementById("themebtn").textContent = "🌙"
        localStorage.setItem("theme","light");
}

// Button Sfx
let hoverSound = document.getElementById('hoverSound');
let clickSound = document.getElementById('clickSound');
const soundBtn = document.getElementById('soundbtn');

if (soundBtn) {
    soundBtn.addEventListener('click' , toggleSound); 
}


if (localStorage.getItem("sound") === "on") {
        document.body.classList.add("on");
        if (soundBtn) soundBtn.textContent = "🔊";
    } else {
        document.body.classList.remove("on");
        if (soundBtn) soundBtn.textContent = "🔇";
    }

playSound();

});




async function displayStreak() {
    const username = '1049363268'; 
    // Using a different proxy: corsproxy.io
    const duolingoUrl = `https://www.duolingo.com/2017-06-30/users?username=CJuwuXD`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(duolingoUrl)}`;

    try {
        const response = await fetch(proxyUrl);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();

        console.log("Raw Data Received:", data);

        if (data?.users?.length > 0) {
            const streak = data.users[0].streak;
            
            
            const el = document.getElementById('streak-number');
            if (el) el.innerText = streak + "🔥";
        } else {
            console.warn("User not found. Check if the username is correct.");
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}


