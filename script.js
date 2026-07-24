// ======================================
// GRAND JEU DE L'ÉTÉ - VERSION 2.0
// COMCYBER-MI
// ======================================
function detecterNavigateur(){

    const ua = navigator.userAgent;

    if(ua.includes("Edg/")) return "Microsoft Edge";

    if(ua.includes("OPR/")) return "Opera";

    if(ua.includes("Firefox/")) return "Mozilla Firefox";

    if(ua.includes("Chrome/") && !ua.includes("Edg/"))
        return "Google Chrome";

    if(ua.includes("Safari/") && !ua.includes("Chrome"))
        return "Safari";

    return "Navigateur inconnu";

}
// ------------------------------
// Participants
// ------------------------------

let participants = 18458;

const compteur = document.getElementById("participants");

setInterval(() => {
    participants += Math.floor(Math.random() * 3) + 1;
    compteur.textContent = participants.toLocaleString("fr-FR");
}, 3500);


// ------------------------------
// Animation du bouton
// ------------------------------

const bouton = document.getElementById("participer");

let agrandir = true;

setInterval(() => {

    bouton.style.transform = agrandir
        ? "scale(1.03)"
        : "scale(1)";

    agrandir = !agrandir;

},700);


// ------------------------------
// Compte à rebours
// ------------------------------

let secondes = (1 * 24 * 3600) + (14 * 3600) + (26 * 60);

const countdown = document.getElementById("countdown");

function actualiserCompteur(){

    if(secondes>0){
        secondes--;
    }

    const jours = Math.floor(secondes / 86400);
    const heures = Math.floor((secondes % 86400)/3600);
    const minutes = Math.floor((secondes % 3600)/60);

const secondesRestantes = secondes % 60;

countdown.innerHTML = `
<div style="font-size:36px;font-weight:700;">
${String(jours).padStart(2,"0")} : ${String(heures).padStart(2,"0")} : ${String(minutes).padStart(2,"0")} : ${String(secondesRestantes).padStart(2,"0")}
</div>

<div style="
font-size:12px;
letter-spacing:2px;
margin-top:6px;
color:#ffd0d0;">
JOURS&nbsp;&nbsp;&nbsp;&nbsp;HEURES&nbsp;&nbsp;&nbsp;&nbsp;MINUTES&nbsp;&nbsp;&nbsp;&nbsp;SECONDES
</div>
`;

}

actualiserCompteur();
setInterval(actualiserCompteur,1000);


// ------------------------------
// Overlay
// ------------------------------

const overlay = document.getElementById("overlay");
const overlayMessage = document.getElementById("overlayMessage");
const progressBar = document.getElementById("progressBar");
const infos = document.getElementById("infosDetectees");

const messages = [

    "Connexion sécurisée...",

    "Vérification de votre participation...",

    "Recherche d'un gagnant...",

    "Analyse de compatibilité...",

    "Validation des informations..."

];


// ------------------------------
// Clic sur PARTICIPER
// ------------------------------

bouton.addEventListener("click",demarrerDemo);

function demarrerDemo(){

    bouton.disabled = true;

    overlay.classList.remove("hidden");

    progressBar.style.width="0%";

    infos.style.display="none";
    infos.innerHTML="";

    let progression=0;

    overlayMessage.innerHTML=messages[0];

    const timer=setInterval(()=>{

        progression++;

        progressBar.style.width=progression+"%";

        if(progression===20)
            overlayMessage.innerHTML=messages[1];

        if(progression===40)
            overlayMessage.innerHTML=messages[2];

        if(progression===60)
            overlayMessage.innerHTML=messages[3];

        if(progression===80)
            overlayMessage.innerHTML=messages[4];

        if(progression>=100){

            clearInterval(timer);

            afficherFelicitations();

        }

    },55);

}



// ------------------------------
// Félicitations
// ------------------------------

function afficherFelicitations(){

    overlayMessage.innerHTML=`

        <div style="font-size:70px;">🎉</div>

        <div style="font-size:42px;font-weight:700;margin-top:10px;">

            FÉLICITATIONS !

        </div>

        <div style="margin-top:20px;font-size:22px;">

            Votre participation a été sélectionnée.

        </div>

    `;

    setTimeout(lancerGlitch,2200);

}



// ------------------------------
// Glitch
// ------------------------------

function lancerGlitch(){

    overlay.classList.add("glitch");

    setTimeout(()=>{

        overlay.classList.remove("glitch");

        lancerAnalyse();

    },1000);

}
// ------------------------------
// Analyse du navigateur
// ------------------------------

function lancerAnalyse(){

    overlayMessage.innerHTML=`
        <div style="font-size:52px;">🔍</div>
        <div style="font-size:34px;font-weight:700;margin-top:10px;">
            Analyse de votre appareil...
        </div>
    `;

    infos.style.display="block";
    infos.innerHTML="";

    const liste=[
        {
            titre:"Navigateur",
           valeur:detecterNavigateur()
        },
        {
    titre:"Système",
    valeur:detecterSysteme()
},
        function detecterSysteme(){

    const ua = navigator.userAgent;

    if(ua.includes("Windows"))
        return "Windows";

    if(ua.includes("Mac"))
        return "macOS";

    if(ua.includes("Android"))
        return "Android";

    if(ua.includes("iPhone") || ua.includes("iPad"))
        return "iOS";

    if(ua.includes("Linux"))
        return "Linux";

    return "Inconnu";

}
        {
            titre:"Langue",
            valeur:navigator.language
        },
        {
            titre:"Fuseau horaire",
            valeur:Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        {
            titre:"Résolution de l'écran",
            valeur:screen.width+" × "+screen.height
        },
        {
            titre:"Taille de la fenêtre",
            valeur:window.innerWidth+" × "+window.innerHeight
        },
        {
            titre:"Plateforme",
            valeur:navigator.platform
        },
        {
            titre:"Nombre de cœurs CPU",
            valeur:navigator.hardwareConcurrency || "Non communiqué"
        },
        {
            titre:"Mémoire de l'appareil",
            valeur:navigator.deviceMemory
                ? navigator.deviceMemory+" Go"
                : "Non communiquée"
        },
        {
            titre:"Écran tactile",
            valeur:navigator.maxTouchPoints>0 ? "Oui" : "Non"
        }
    ];

    let i=0;
let adresseIP = "Recherche...";

fetch("https://api.ipify.org?format=json")
.then(reponse => reponse.json())
.then(data => {

    adresseIP = data.ip;

    liste.splice(2,0,{
        titre:"Adresse IP",
        valeur:adresseIP
    });

});
    const timer=setInterval(()=>{

      infos.innerHTML += `
<div style="
display:flex;
justify-content:space-between;
border-bottom:1px solid rgba(255,255,255,.15);
padding:10px 0;
font-size:20px;
">

<span><b>${liste[i].titre}</b></span>

<span>${liste[i].valeur}</span>

</div>
`;

        infos.scrollTop=infos.scrollHeight;

        i++;

        if(i>=liste.length){

            clearInterval(timer);

            setTimeout(afficherRevelation,1500);

        }

    },900);

}



// ------------------------------
// Révélation
// ------------------------------

function afficherRevelation(){

    overlayMessage.innerHTML=`
        <div style="font-size:60px;">⚠️</div>

        <div style="
            font-size:38px;
            font-weight:700;
            margin-top:10px;
            color:#ffd54f;
        ">
            DÉMONSTRATION DE QUISHING
        </div>
    `;

    infos.innerHTML += `

<hr style="
margin:30px 0;
border:0;
border-top:1px solid rgba(255,255,255,.2);
">

<div style="
text-align:center;
font-size:26px;
font-weight:600;
line-height:1.5;
margin-bottom:25px;
">

Vous venez de participer<br>
à une démonstration de Quishing.

</div>

<div style="text-align:center;">

<img
src="images/logo-comcyber-mi.png"
alt="COMCYBER-MI"
style="
width:280px;
background:white;
padding:12px;
border-radius:12px;
">

</div>

<div style="
text-align:center;
margin-top:35px;
">

<button id="rejouerDemo"
style="
padding:16px 34px;
border:none;
border-radius:12px;
background:#ff9800;
color:white;
font-size:18px;
font-weight:bold;
cursor:pointer;
">

↺ Recommencer

</button>

</div>
`;

    document
        .getElementById("rejouerDemo")
        .addEventListener("click",()=>{

            overlay.classList.add("hidden");

            document.querySelector(".loader").style.display="block";

            bouton.disabled=false;

            progressBar.style.width="0%";

            infos.innerHTML="";

        });

}
