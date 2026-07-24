// ================================
// GRAND JEU DE L'ÉTÉ
// Version 1.2
// ================================

// -------- Participants --------

let participants = 18452;

const compteur = document.getElementById("participants");

setInterval(() => {

    participants++;

    compteur.textContent = participants.toLocaleString("fr-FR");

}, 4000);

// -------- Bouton --------

const bouton = document.getElementById("participer");

let zoom = true;

setInterval(() => {

    if (zoom) {

        bouton.style.transform = "scale(1.03)";

    } else {

        bouton.style.transform = "scale(1)";

    }

    zoom = !zoom;

}, 800);

// -------- Compte à rebours --------

let secondes = (1 * 24 * 3600) + (14 * 3600) + (26 * 60);

const countdown = document.querySelector(".countdown strong");

function actualiserCompteur(){

    secondes--;

    const jours = Math.floor(secondes / 86400);

    const heures = Math.floor((secondes % 86400) / 3600);

    const minutes = Math.floor((secondes % 3600) / 60);

    countdown.textContent =
        jours + " jour " +
        heures + " h " +
        minutes + " min";

}

setInterval(actualiserCompteur,1000);
