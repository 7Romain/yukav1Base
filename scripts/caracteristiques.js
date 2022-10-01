/**
 *Creer le tableau nutritionnel et le remplit si les info existent.
 * @param {*} resultat = json du produit
 *
 */
export const afficherCaracteristiques = function (resultat) {
    const caracteristiques = document.getElementById("carac");

    let texte = "";
    if (resultat.products[0]["product_name_fr"]) {
        texte +=
            "<span class= 'gras' >Nom : </span>" +
            resultat.products[0]["product_name_fr"] +
            "<br /><br />";
    } else if (resultat.products[0]["product_name_en"]) {
        texte +=
            "<span class= 'gras' >Nom Générique : </span>" +
            resultat.products[0]["product_name_en"] +
            "<br /><br />";
    } else {
        texte += "Nom inconnu" + "<br /><br />";
    }

    if (resultat.products[0]["brands_imported"]) {
        texte +=
            "<span class= 'gras' >Marque : </span>" +
            resultat.products[0]["brands_imported"] +
            "<br /><br />";
    } else if (resultat.products[0]["brands"]) {
        texte +=
            "<span class= 'gras' >Marque : </span>" +
            resultat.products[0]["brands"] +
            "<br /><br />";
    }

    if (resultat.products[0]["quantity"]) {
        texte +=
            "<span class= 'gras' >Quantité : </span>" +
            resultat.products[0]["quantity"] +
            "<br /><br />";
    }

    if (resultat.products[0]["packaging_text_fr"]) {
        texte +=
            "<span class= 'gras' >Conditionnement : </span>" +
            resultat.products[0]["packaging_text_fr"] +
            "<br /><br />";
    }

    if (resultat.products[0]["categories_old"]) {
        texte +=
            "<span class= 'gras' >Catégories : </span>" +
            resultat.products[0]["categories_old"] +
            "<br /><br />";
    }

    if (resultat.products[0]["preparation_fr"]) {
        texte +=
            "<span class= 'gras' >Préparation : </span>" +
            resultat.products[0]["preparation_fr"] +
            "<br /><br />";
    }

    if (resultat.products[0]["traces_imported"]) {
        texte +=
            "<span class= 'gras' >Traces : </span>" +
            resultat.products[0]["traces_imported"] +
            "<br /><br />";
    }

    if (resultat.products[0]["stores"]) {
        texte +=
            "<span class= 'gras' >Magasins : </span>" +
            resultat.products[0]["stores"] +
            "<br /><br />";
    }

    if (resultat.products[0]["conservation_conditions_fr"]) {
        texte +=
            "<span class= 'gras' >Conservation : </span>" +
            resultat.products[0]["conservation_conditions_fr"] +
            "<br /><br />";
    }

    caracteristiques.innerHTML = texte;
};
