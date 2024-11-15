// Objet regex dont le pattern est de permettre seulement des chiffres
const REGEX_SEULEMENT_CHIFFRE = /^\d+$/;
 
// Les éléments html du formulaire utilisés dans le script
const inputNoDA = document.getElementById('numero_da');             // Le input du numéro de da
const declaration = document.getElementById('declaration');         // Le checkbox de la déclaration
const sliderNote = document.getElementById('note_estime');          // Le slider de sélection de la note estimée
const titreNote = document.getElementById('titre_note_estime');     // Le titre de la note estimé
const daIconeErreur = document.getElementById('da_icone_erreur');   // L'icone d'erreur associée au input du numéro de da
const daIconeSucces = document.getElementById('da_icone_succes');   // L'icone de succès associée au input du numéro de da
const messageErreur = document.querySelector(".tooltiptext")
 
const form = document.getElementById("formulaire_examen")
 
// Initialisation de l'affichage de la bonne icone associé au numéro de da
daIconeErreur.classList.remove('hidden');
daIconeSucces.classList.add('hidden');
 
inputNoDA.addEventListener('keyup', VerifierNumeroDA)
 
 
function VerifierNumeroDA() {
    const numeroDA = inputNoDA.value;
    if(REGEX_SEULEMENT_CHIFFRE.test(inputNoDA.value) && inputNoDA.value.length == 7 && (inputNoDA.value[0] == 1 || inputNoDA.value[0] == 2)){
        daIconeErreur.classList.add('hidden');
        daIconeSucces.classList.remove('hidden');
        messageErreur.style.visibility = "none"
        AfficherMessage(document.getElementById("message_numero_da"), "")
    }
    else{
        daIconeErreur.classList.remove('hidden');
        daIconeSucces.classList.add('hidden');
        messageErreur.style.visibility = "visible"
        messageErreur.style.opacity = "1"
        AfficherMessage(document.getElementById("message_numero_da"), "Le numéro de DA doit être composé d'exactement 7 chiffres et débuté par 1 ou 2 ")
    }
}
 
/**
 * Modifie les classes d'un élément icone selon la valeur d'une note
 * @param {integer} note La note utilisée pour savoir qu'elle classe prendre
 */
 
sliderNote.addEventListener("input",()=> ModifierIconeNote(sliderNote.value))
function ModifierIconeNote(note) {
    const iconeNote = document.getElementById('icone_note');
    iconeNote.setAttribute("class", ""); // Réinitialisation des classes
 
    note = parseInt(note); // Convertir en entier pour éviter des erreurs
 
    if (note >= 0 && note <= 19) {
        iconeNote.setAttribute("class", "far fa-sad-cry");
    } else if (note >= 20 && note <= 39) {
        iconeNote.setAttribute("class", "far fa-sad-tear");
    } else if (note >= 40 && note <= 59) {
        iconeNote.setAttribute("class", "far fa-frown");
    } else if (note >= 60 && note <= 79) {
        iconeNote.setAttribute("class", "far fa-smile");
    } else if (note >= 80 && note <= 100) {
        iconeNote.setAttribute("class", "far fa-grin-squint-tears");
    }
 
    titreNote.innerHTML = `Ma note estimée = ${note}`
}
 
/**
 * Affiche un message dans la première balise small du même niveau qu'un élément html
 * @param {HTMLElement} element L'élément html de départ
 * @param {string} message Le message à afficher
 */
function AfficherMessage(element, message = '') {
    const zoneMessage = element.parentElement.querySelector('small');
    zoneMessage.innerHTML = message;
}
 
const bool = declaration.checked
const vaild = true
 form.addEventListener("submit",validationFrom)
 function validationFrom(e) {
    let isValid = true;

    
    if (!REGEX_SEULEMENT_CHIFFRE.test(inputNoDA.value)) {
        isValid = false;
        AfficherMessage(
            document.getElementById("message_numero_da"),
            "Le numéro de DA doit être composé d'exactement 7 chiffres et débuté par 1 ou 2."
        );
    }

    
    if (!declaration.checked) {
        isValid = false;
        AfficherMessage(
            document.getElementById("message_declaration"),
            "Vous devez cocher la case pour continuer."
        );
    }

    
    if (!isValid) {
        e.preventDefault();
    }
}