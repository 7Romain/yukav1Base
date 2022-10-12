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
 * liste des champs à récuperer via l'api
 */
// const listeFields = [
//     "&fields=",
//     "product_name_fr",
//     "product_name_en",
//     "brands_imported",
//     "brands",
//     "quantity",
//     "packaging_text_fr",
//     "categories_old",
//     "preparation_fr",
//     "traces_imported",
//     "stores",
//     "conservation_conditions_fr",
//     "ingredients_text_with_allergens_fr",
//     "Ingredients_text_en",
//     "image_small_url",
//     "nutriscore_grade",
//     "ecoscore_grade",
//     "nova_group",
//     "nutrition_data_prepared_per",
//     "fat_100g",
//     "energy-kj",
//     "saturated-fat_100g",
//     "carbohydrates_100g",
//     "sugars_100g",
//     "fiber_modifier",
//     "fiber_100g",
//     "proteins_100g",
//     "salt_100g",
//     "alcohol",
//     "fruits-vegetables-nuts-estimate-from-ingredients_100g",
// ];

/**
 * Ajoute un écouteur sur le bouton rechercher qui lance la recherche et
 * rend visible la fiche produit.
 */

formulaire.addEventListener("submit", function (e) {
    section.classList.add("cacher");
    section.classList.remove("sectionVisible");

    if (regex.test(code.value)) {
        e.preventDefault();

        fetch(
            "http://fr.openfoodfacts.org/api/v2/search?code=" + code.value
            // +listeFields.toString()
        )
            .then((response) => response.json())

            .then(function (data) {
                resultat = data;
                console.log(resultat);

                if (resultat.count === 0) {
                    alert(
                        "Le produit n'est pas présent dans la base de données"
                    );
                } else {
                    afficher(resultat);
                    section.classList.remove("cacher");
                    section.classList.add("sectionVisible");
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
