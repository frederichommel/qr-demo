// ======================================
// GRAND JEU DE L'ÉTÉ
// Démonstration Quishing
// COMCYBER-MI
// ======================================



// -------------------------------------------------
// Détection du navigateur
// -------------------------------------------------

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



// -------------------------------------------------
// Détection du système
// -------------------------------------------------

function detecterSysteme(){

    const ua = navigator.userAgent;

    if(ua.includes("Windows")) return "Windows";

    if(ua.includes("Mac")) return "macOS";

    if(ua.includes("Android")) return "Android";

    if(ua.includes("iPhone") || ua.includes("iPad"))
        return "iOS";

    if(ua.includes("Linux"))
        return "Linux";

    return "Inconnu";

}



// -------------------------------------------------
// Compteur participants
// -------------------------------------------------

let participants = 18458;

const compteur = document.getElementById("participants");

setInterval(()=>{

    participants += Math.floor(Math.random()*3)+1;

    compteur.textContent =
        participants.toLocaleString("fr-FR");

},3500);




// -------------------------------------------------
// Animation bouton
// -------------------------------------------------

const bouton =
document.getElementById("participer");

let agrandir=true;

setInterval(()=>{

    bouton.style.transform=
        agrandir
        ? "scale(1.03)"
        : "scale(1)";

    agrandir=!agrandir;

},700);




// -------------------------------------------------
// Compte à rebours
// -------------------------------------------------

let secondes =
(1*24*3600)+(14*3600)+(26*60);

const countdown =
document.getElementById("countdown");

function actualiserCompteur(){

    if(secondes>0){

        secondes--;

    }

    const jours =
        Math.floor(secondes/86400);

    const heures =
        Math.floor((secondes%86400)/3600);

    const minutes =
        Math.floor((secondes%3600)/60);

    countdown.innerHTML=`

        <div style="font-size:54px;font-weight:700;line-height:1.15;">

            ${jours}j<br>

            ${heures}h<br>

            ${minutes}min

        </div>

    `;

}

actualiserCompteur();

setInterval(actualiserCompteur,1000);




// -------------------------------------------------
// Overlay
// -------------------------------------------------

const overlay =
document.getElementById("overlay");

const overlayMessage =
document.getElementById("overlayMessage");

const progressBar =
document.getElementById("progressBar");

const infos =
document.getElementById("infosDetectees");

const messages=[

"Connexion sécurisée...",

"Vérification de votre participation...",

"Recherche d'un gagnant...",

"Analyse de compatibilité...",

"Validation des informations..."

];




// -------------------------------------------------
// Lancement démonstration
// -------------------------------------------------

bouton.addEventListener(
"click",
demarrerDemo
);

function demarrerDemo(){

    bouton.disabled=true;

    overlay.classList.remove("hidden");

    progressBar.style.width="0%";

    infos.style.display="none";

    infos.innerHTML="";

    let progression=0;

    overlayMessage.innerHTML=messages[0];

    const timer=setInterval(()=>{

        progression++;

        progressBar.style.width=
        progression+"%";

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
// Analyse
// ------------------------------

async function lancerAnalyse(){

    overlayMessage.innerHTML = `
        <div style="font-size:52px;">🔍</div>
        <div style="font-size:34px;font-weight:700;margin-top:10px;">
            Analyse de votre appareil...
        </div>
    `;

    infos.style.display="block";
    infos.innerHTML="";

    //---------------------------------------------------
    // Adresse IP + Pays
    //---------------------------------------------------

    let ip="Non disponible";
    let pays="Non disponible";

    try{

        const reponse =
        await fetch("https://ipapi.co/json/");

        const data =
        await reponse.json();

        ip=data.ip;
        pays=data.country_name;

    }

    catch(e){

        console.log("Impossible de récupérer l'adresse IP.");

    }

    //---------------------------------------------------
    // Langue lisible
    //---------------------------------------------------

    const langue =
        new Intl.DisplayNames(
            ['fr'],
            {type:'language'}
        ).of(
            navigator.language.split("-")[0]
        )
        +" ("+
        navigator.language.toUpperCase()+
        ")";

    //---------------------------------------------------
    // Liste
    //---------------------------------------------------

    const liste=[

        {
            titre:"Navigateur",
            valeur:detecterNavigateur()
        },

        {
            titre:"Système",
            valeur:detecterSysteme()
        },

        {
            titre:"Adresse IP",
            valeur:ip
        },

        {
            titre:"Pays",
            valeur:pays
        },

        {
            titre:"Langue",
            valeur:langue
        },

        {
            titre:"Fuseau horaire",
            valeur:Intl.DateTimeFormat().resolvedOptions().timeZone
        },

        {
            titre:"Résolution",
            valeur:
            screen.width+
            " × "+
            screen.height
        },

        {
            titre:"Mémoire",
            valeur:
            navigator.deviceMemory
            ? navigator.deviceMemory+" Go"
            : "Non communiquée"
        },

        {
            titre:"CPU",
            valeur:
            navigator.hardwareConcurrency
            ? navigator.hardwareConcurrency+" cœurs"
            : "Non communiqué"
        },

        {
            titre:"Écran tactile",
            valeur:
            navigator.maxTouchPoints>0
            ? "Oui"
            : "Non"
        }

    ];

    //---------------------------------------------------
    // Affichage progressif
    //---------------------------------------------------

    let i=0;

    const timer=setInterval(()=>{

        infos.innerHTML += `

        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding:10px 0;
            border-bottom:1px solid rgba(255,255,255,.15);
            font-size:20px;
        ">

            <span><b>${liste[i].titre}</b></span>

            <span>${liste[i].valeur}</span>

        </div>

        `;

        i++;

        if(i>=liste.length){

            clearInterval(timer);

            setTimeout(
                afficherRevelation,
                1200
            );

        }

    },700);

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
