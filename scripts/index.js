/* eslint-disable dot-notation */
import { genererAccordeon } from "./accordeon.js";
import { afficherImageProduit, afficherScores } from "./images.js";
import { afficherTableau } from "./tableau.js";
import { afficherIngredients } from "./ingredients.js";
import { afficherCaracteristiques } from "./caracteristiques.js";

genererAccordeon();

const section = document.getElementById("section");
const code = document.getElementById("rechercher");
const formulaire = document.getElementById("demande");
const regex = /[\d]{8,13}/;
let resultat;

/**
 *
 * Lance toute les fonctions d'affichage des données.
 * @param {*} resultat  = json du produit
 */
const afficher = function (resultat) {
    afficherImageProduit(resultat);
    afficherScores(resultat);
    afficherIngredients(resultat);
    afficherCaracteristiques(resultat);
    afficherTableau(resultat);
};

/**
 * Ajoute un écouteur sur le bouton rechercher qui lance la recherche et
 * rend visible la fiche produit.
 */

formulaire.addEventListener("submit", function (e) {
    if (regex.test(code.value)) {
        e.preventDefault();

        fetch("http://fr.openfoodfacts.org/api/v2/search?code=" + code.value)
            .then((response) => response.json())

            .then(function (data) {
                resultat = data;
                console.table(resultat);
                section.classList.add("sectionVisible");
                afficher(resultat);

                if (resultat.count === 0) {
                    alert(
                        "Le produit n'est pas présent dans la base de données"
                    );
                } else {
                    console.log("ok");
                }
            })
            .catch(function (err) {
                alert("Le produit n'est pas présent dans la base de données");
                console.log(err.message);
            });
    } else {
        alert("veuillez entrer un code barre valide");
    }
});
