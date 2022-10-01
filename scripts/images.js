/**
 *
 *Affiche l'image du produit.
 * @param {*} resultat = json du produit
 */
export const afficherImageProduit = function (resultat) {
    const imgProduct = document.getElementById("imgProduct");
    if (resultat.products[0].image_small_url) {
        imgProduct.setAttribute("src", resultat.products[0].image_small_url);
    } else {
        imgProduct.setAttribute("src", "/images/pasImage.svg");
    }
};

/**
 *
 *Affiche les image des scores Nova eco et nutri.
 * @param {*} resultat = json  du produit
 */
export const afficherScores = function (resultat) {
    const imgNutri = document.getElementById("imgNutri");
    const imgNova = document.getElementById("imgNova");
    const imgEcoscore = document.getElementById("imgEcoscore");
    switch (resultat.products[0]["nutriscore_grade"]) {
        case "a":
            imgNutri.setAttribute("src", "/images/nutriscore-a.svg");
            break;
        case "b":
            imgNutri.setAttribute("src", "/images/nutriscore-b.svg");
            break;
        case "c":
            imgNutri.setAttribute("src", "/images/nutriscore-c.svg");
            break;
        case "d":
            imgNutri.setAttribute("src", "/images/nutriscore-d.svg");
            break;
        case "e":
            imgNutri.setAttribute("src", "/images/nutriscore-e.svg");
            break;
        default:
            imgNutri.setAttribute("src", "/images/nutriscore-unknown.svg");
    }
    switch (resultat.products[0]["nova_group"]) {
        case 1:
            imgNova.setAttribute("src", "/images/nova-group-1.svg");
            break;
        case 2:
            imgNova.setAttribute("src", "/images/nova-group-2.svg");
            break;
        case 3:
            imgNova.setAttribute("src", "/images/nova-group-3.svg");
            break;
        case 4:
            imgNova.setAttribute("src", "/images/nova-group-4.svg");
            break;
        default:
            imgNova.setAttribute("src", "/images/nova-group-unknown.svg");
    }
    switch (resultat.products[0]["ecoscore_grade"]) {
        case "a":
            imgEcoscore.setAttribute("src", "/images/ecoscore-a.svg");
            break;
        case "b":
            imgEcoscore.setAttribute("src", "/images/ecoscore-b.svg");
            break;
        case "c":
            imgEcoscore.setAttribute("src", "/images/ecoscore-c.svg");
            break;
        case "d":
            imgEcoscore.setAttribute("src", "/images/ecoscore-d.svg");
            break;
        case "e":
            imgEcoscore.setAttribute("src", "/images/ecoscore-e.svg");
            break;
        default:
            imgEcoscore.setAttribute("src", "/images/ecoscore-unknown.svg");
    }
};
