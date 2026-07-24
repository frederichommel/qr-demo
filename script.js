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
// ================================
// Faux chargement
// ================================

const overlay = document.getElementById("overlay");
const overlayMessage = document.getElementById("overlayMessage");
const progressBar = document.getElementById("progressBar");

const messages = [
    "Connexion sécurisée...",
    "Vérification de votre participation...",
    "Recherche d'un gagnant...",
    "Analyse de compatibilité...",
    "Validation des informations...",
    "🎉 FÉLICITATIONS !"
];

bouton.addEventListener("click", () => {

    overlay.classList.remove("hidden");

    let progression = 0;
    let etape = 0;

    overlayMessage.textContent = messages[0];
    progressBar.style.width = "0%";

    const timer = setInterval(() => {

        progression += 2;
        progressBar.style.width = progression + "%";

        if (progression === 20) overlayMessage.textContent = messages[1];
        if (progression === 40) overlayMessage.textContent = messages[2];
        if (progression === 60) overlayMessage.textContent = messages[3];
        if (progression === 80) overlayMessage.textContent = messages[4];

        if (progression >= 100) {

            clearInterval(timer);

            overlayMessage.innerHTML = `
                <div style="font-size:70px;">🎉</div>
                <div style="font-size:42px;font-weight:bold;">
                    FÉLICITATIONS !
                </div>
                <div style="margin-top:15px;font-size:22px;">
                    Votre participation a été sélectionnée.
                </div>
            `;
setTimeout(() => {

    overlay.classList.add("glitch");

}, 2000);

setTimeout(() => {

    overlay.classList.remove("glitch");

    overlayMessage.innerHTML = `
        <div style="font-size:60px;">⚠️</div>

        <div style="font-size:38px;font-weight:bold;margin-top:10px;">
            ATTENTION
        </div>

        <div style="margin-top:25px;font-size:22px;line-height:1.6;max-width:700px;">
            Vous venez de participer à une démonstration de <b>Quishing</b>.

            <br><br>

            Un simple QR Code peut conduire vers un faux site extrêmement crédible.
        </div>
    `;

}, 3000);
        }

    },80);

});
