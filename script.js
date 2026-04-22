

/* theme changer */

const themebtn = document.getElementById("theme");

if(localStorage.getItem("theme")== "dark"){
    document.body.classList.add("dark");
}

themebtn.addEventListener('click', () => {
    document.body.classList.toggle("dark");
    console.log("hi")
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
    }else{
        localStorage.setItem("theme","light");
    }
});