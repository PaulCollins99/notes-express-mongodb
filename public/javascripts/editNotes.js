'use strict';

//######################################## Nav ########################################\\

function toggle () {
    const navElement = document.getElementById("navbar")
    let navState = navElement.getAttribute('aria-hidden');
    navElement.setAttribute('aria-hidden', navState == 'true' ? false : true); 
}

//######################################## Note Script ########################################\\

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recorder = new SpeechRecognition();

function start (e) {

    recorder.start();
}

function run() {
    recorder.onstart = () => {
        console.log('Voice activated');
    };

    recorder.onresult = (event) => {
        const resultIndex = event.resultIndex;
        const transcript = event.results[resultIndex][0].transcript;
        document.getElementById("full").textContent += transcript
    };
}

function editNote (e) {
    let current = window.location.href
    window.location.href = current.substring(0, current.length - 7) + "editNote/" + e.target.id
    localStorage.setItem("load", e.target.id)
}

function boot () {
    window.openNav.addEventListener('click', toggle);
    window.closeNav.addEventListener('click', toggle);
    let buttonList = document.querySelectorAll(".noteButton")
    buttonList.forEach(element => {
        element.addEventListener("click", editNote)
    });

    const today = new Date();
    const options = {weekday : 'long'}
    let month;
    if (today.getMonth() + 1 < 10) {
        month = "0" + (today.getMonth() + 1)
    } else {
        month = today.getMonth() + 1
    }
    const date = new Intl.DateTimeFormat('en-US', options).format(today) + " " + today.getDate() + ":" + month + ":" + today.getFullYear() ;
    document.getElementById("currentDate").textContent = date
}

setTimeout(function () {
    let viewheight = window.outerHeight
    let viewwidth = window.outerWidth
    let viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
}, 150);


document.addEventListener('load', boot);
if(!window.location.hash) {
    window.location = window.location + '#loaded';
    window.location.reload();
  }
boot()