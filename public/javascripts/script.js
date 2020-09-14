'use strict';

//######################################## Service Worker ########################################\\

if (navigator.serviceWorker) {
    async function registerServiceWorker() {
        try {
            await navigator.serviceWorker.register('./sw.js');
        } catch (e) {
            console.error("Service Worker failed.  Falling back to 'online only'.", e);
        }
    }
    window.addEventListener('load', registerServiceWorker);
}

//######################################## Nav ########################################\\

function toggle () {
    const navElement = document.getElementById("navbar")
    let navState = navElement.getAttribute('aria-hidden');
    navElement.setAttribute('aria-hidden', navState == 'true' ? false : true); 
}

//######################################## Note Script ########################################\\

function editNote (e) {
    let current = window.location.href
    window.location.href = current.substring(0, current.length - 14) + "editNote/" + e.target.id
    localStorage.setItem("load", e.target.id)
}

function boot () {
    window.openNav.addEventListener('click', toggle);
    window.closeNav.addEventListener('click', toggle);
    let buttonList = document.querySelectorAll(".noteButton")
    buttonList.forEach(element => {
        element.addEventListener("click", editNote)
    });
}


document.addEventListener('load', boot);
if(!window.location.hash) {
    window.location = window.location + '#loaded';
    window.location.reload();
  }
boot()