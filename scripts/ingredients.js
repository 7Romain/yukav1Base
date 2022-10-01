/**
 *afficher la liste des ingrédients si elle existe.
 * @param {*} resultat  = json du produit
 */
export const afficherIngredients = function (resultat) {
    const ingredients = document.getElementById("listeIngredients");

    if (resultat.products[0]["ingredients_text_with_allergens_fr"]) {
        ingredients.innerHTML =
            resultat.products[0]["ingredients_text_with_allergens_fr"];
    } else if (resultat.products[0]["ingredients_text_en"]) {
        ingredients.innerText = resultat.products[0]["ingredients_text_en"];
    } else {
        ingredients.innerText = "Liste d'ingrédients indisponible";
    }
};
