// Things I Want To Do
// > finish home page
// > add sound fx 
// > start blog page, with functioning uploads, likes, comments, etc.
// > add cool stuff to tools, (qrcode generator, sorting algorithms, mp3 converter)
// > add basic games
// > experiment with ads
// > add cool chat bot at bottom right
// show current duolingo script
// add game black jack lol


// Things to learn
// > Git version control and commands
// > learn java script syntax
// > learn a javascript framework (react.js)


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


//TODO: FIX IMAGE UPDATE AUTOMATICALLY
function changeTheme() {
    document.body.classList.toggle("dark");
    
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        skrbl.src = "../assets/images/skrblai-dark.png"
    }else{
        localStorage.setItem("theme","light");
        skrbl.src = "../assets/images/skrblai.png";
    }
}

/* popup window for settings */
document.addEventListener("DOMContentLoaded", function(){

/* theme changer */

const themebtn = document.getElementById("theme");
const skrbl = document.getElementById("skrbl");

if(localStorage.getItem("theme")== "dark"){
    document.body.classList.add("dark");
}



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
});


// Blog Logic





//login btn
function goToLogin() {
    window.location.href = "../login";
}

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



