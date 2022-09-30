/* eslint-disable dot-notation */
const acc = function () {
    const accordeon = document.getElementsByClassName("accordion");
    for (let i = 0; i < accordeon.length; i++) {
        accordeon[i].addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            const panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
};

acc();

const section = document.getElementById("section");
const code = document.getElementById("rechercher");
const formulaire = document.getElementById("demande");
const imgProduct = document.getElementById("imgProduct");
const imgNutri = document.getElementById("imgNutri");
const imgNova = document.getElementById("imgNova");
const imgEcoscore = document.getElementById("imgEcoscore");
const ingredients = document.getElementById("listeIngredients");
const caracteristiques = document.getElementById("carac");
const tableNut = document.getElementById("tableNutri");
const regex = /[\d]{8,13}/;
let resultat;
/**
 *
 *Affiche l'image du produit.
 * @param {*} resultat = json du produit
 */
const afficherImageProduit = function (resultat) {
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
const afficherScores = function (resultat) {
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

/**
 *afficher la liste des ingrédients si elle existe.
 * @param {*} resultat  = json du produit
 */
const afficherIngredients = function (resultat) {
    if (resultat.products[0]["ingredients_text_with_allergens_fr"]) {
        ingredients.innerHTML =
            resultat.products[0]["ingredients_text_with_allergens_fr"];
    } else if (resultat.products[0]["ingredients_text_en"]) {
        ingredients.innerText = resultat.products[0]["ingredients_text_en"];
    } else {
        ingredients.innerText = "Liste d'ingrédients indisponible";
    }
};

/**
 * Test pour éviter d'afficher undefind.
 * @param {*} valeur
 * @return {*}
 */
const testValeur = function (valeur) {
    if (valeur !== undefined) {
        return valeur;
    } else {
        return "?";
    }
};

/**
 * Test pour éviter d'afficher undefind.
 * @param {*} valeur
 * @return {*}
 */
const testModificateur = function (valeur) {
    if (valeur === ">") {
        return ">";
    } else if (valeur === "<") {
        return "<";
    } else {
        return "";
    }
};

/**
 *Creer le tableau nutritionnel et le remplit si les info existent.
 * @param {*} resultat = json du produit
 *
 */
const afficherTableau = function (resultat) {
    tableNut.innerHTML = "";
    const tableauNutri = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    tableauNutri.classList.add("table-style");
    tableauNutri.appendChild(thead);
    tableauNutri.appendChild(tbody);

    tableNut.appendChild(tableauNutri);

    const row1 = document.createElement("tr");
    const heading1 = document.createElement("th");
    heading1.innerHTML = " ";

    const heading2 = document.createElement("th");
    heading2.innerHTML = "pour " + resultat.products[0]["nutrition_data_per"];
    row1.appendChild(heading1);
    row1.appendChild(heading2);
    thead.appendChild(row1);

    if (resultat.products[0]["nutriments"]["energy-kj"]) {
        const row2 = document.createElement("tr");
        const row2Data1 = document.createElement("td");
        row2Data1.innerHTML = "Energie";
        const row2Data2 = document.createElement("td");
        row2Data2.innerHTML =
            testValeur(resultat.products[0]["nutriments"]["energy-kj"]) + " kj";
        row2.appendChild(row2Data1);
        row2.appendChild(row2Data2);
        tbody.appendChild(row2);
    }

    if (resultat.products[0]["nutriments"]["fat_100g"]) {
        const row3 = document.createElement("tr");
        const row3Data1 = document.createElement("td");
        row3Data1.innerHTML = "Matières grasses";
        const row3Data2 = document.createElement("td");
        row3Data2.innerHTML =
            testValeur(resultat.products[0]["nutriments"]["fat_100g"]) + " g";
        row3.appendChild(row3Data1);
        row3.appendChild(row3Data2);
        tbody.appendChild(row3);
    }

    if (resultat.products[0]["nutriments"]["saturated-fat_100g"]) {
        const row4 = document.createElement("tr");
        const row4Data1 = document.createElement("td");
        row4Data1.innerHTML = "Acides gras saturés";
        const row4Data2 = document.createElement("td");
        row4Data2.innerHTML =
            testValeur(
                resultat.products[0]["nutriments"]["saturated-fat_100g"]
            ) + " g";
        row4.appendChild(row4Data1);
        row4.appendChild(row4Data2);
        tbody.appendChild(row4);
    }

    if (resultat.products[0]["nutriments"]["carbohydrates_100g"]) {
        const row5 = document.createElement("tr");
        const row5Data1 = document.createElement("td");
        row5Data1.innerHTML = "Glucides";
        const row5Data2 = document.createElement("td");
        row5Data2.innerHTML =
            testValeur(
                resultat.products[0]["nutriments"]["carbohydrates_100g"]
            ) + " g";
        row5.appendChild(row5Data1);
        row5.appendChild(row5Data2);
        tbody.appendChild(row5);
    }

    if (resultat.products[0]["nutriments"]["sugars_100g"]) {
        const row6 = document.createElement("tr");
        const row6Data1 = document.createElement("td");
        row6Data1.innerHTML = "Sucres";
        const row6Data2 = document.createElement("td");
        row6Data2.innerHTML =
            testValeur(resultat.products[0]["nutriments"]["sugars_100g"]) +
            " g";
        row6.appendChild(row6Data1);
        row6.appendChild(row6Data2);
        tbody.appendChild(row6);
    }

    if (resultat.products[0]["nutriments"]["fiber_modifier"]) {
        const row7 = document.createElement("tr");
        const row7Data1 = document.createElement("td");
        row7Data1.innerHTML = "Fibres alimentaires";
        const row7Data2 = document.createElement("td");
        row7Data2.innerHTML =
            testModificateur(
                resultat.products[0]["nutriments"]["fiber_modifier"]
            ) +
            " " +
            testValeur(resultat.products[0]["nutriments"]["fiber_100g"]) +
            " g";
        row7.appendChild(row7Data1);
        row7.appendChild(row7Data2);
        tbody.appendChild(row7);
    }

    if (resultat.products[0]["nutriments"]["proteins_100g"]) {
        const row8 = document.createElement("tr");
        const row8Data1 = document.createElement("td");
        row8Data1.innerHTML = "Protéines";
        const row8Data2 = document.createElement("td");
        row8Data2.innerHTML =
            testValeur(resultat.products[0]["nutriments"]["proteins_100g"]) +
            " g";
        row8.appendChild(row8Data1);
        row8.appendChild(row8Data2);
        tbody.appendChild(row8);
    }

    if (resultat.products[0]["nutriments"]["salt_100g"]) {
        const row9 = document.createElement("tr");
        const row9Data1 = document.createElement("td");
        row9Data1.innerHTML = "Sel";
        const row9Data2 = document.createElement("td");
        row9Data2.innerHTML =
            testValeur(resultat.products[0]["nutriments"]["salt_100g"]) + " g";
        row9.appendChild(row9Data1);
        row9.appendChild(row9Data2);
        tbody.appendChild(row9);
    }

    if (resultat.products[0]["nutriments"]["alcohol"]) {
        const row10 = document.createElement("tr");
        const row10Data1 = document.createElement("td");
        row10Data1.innerHTML = "Alcool";
        const row10Data2 = document.createElement("td");
        row10Data2.innerHTML =
            testValeur(resultat.products[0]["nutriments"]["alcohol"]) + " g";
        row10.appendChild(row10Data1);
        row10.appendChild(row10Data2);
        tbody.appendChild(row10);
    }

    if (
        resultat.products[0]["nutriments"][
            "fruits-vegetables-nuts-estimate-from-ingredients_100g"
        ]
    ) {
        const row11 = document.createElement("tr");
        const row11Data1 = document.createElement("td");
        row11Data1.innerHTML =
            "Fruits‚ légumes‚ noix et huiles de colza‚ noix et olive (estimation par analyse de la liste des ingrédients)";
        const row11Data2 = document.createElement("td");
        row11Data2.innerHTML =
            testValeur(
                resultat.products[0]["nutriments"][
                    "fruits-vegetables-nuts-estimate-from-ingredients_100g"
                ]
            ) + " g";
        row11.appendChild(row11Data1);
        row11.appendChild(row11Data2);
        tbody.appendChild(row11);
    }
};

/**
 *Creer le tableau nutritionnel et le remplit si les info existent.
 * @param {*} resultat = json du produit
 *
 */
const afficherCaracteristiques = function (resultat) {
    let texte = "";
    if (resultat.products[0]["product_name_fr"]) {
        texte += "<span class= 'gras' >Nom : </span>" + resultat.products[0]["product_name_fr"] + "\n\n";
    } else if (resultat.products[0]["product_name_en"]) {
        texte +=
            "<span class= 'gras' >Nom Générique : </span>" +
            resultat.products[0]["product_name_en"] +
            "\n\n";
    } else {
        texte += "Nom inconnu" + "\n";
    }

    if (resultat.products[0]["brands_imported"]) {
        texte +=
            "<span class= 'gras' >Marque : </span>" + resultat.products[0]["brands_imported"] + "\n" + "\n";
    } else if (resultat.products[0]["brands"]) {
        texte += "<span class= 'gras' >Marque : </span>" + resultat.products[0]["brands"] + "\n" + "\n";
    }

    if (resultat.products[0]["quantity"]) {
        texte += "<span class= 'gras' >Quantité : </span>" + resultat.products[0]["quantity"] + "\n" + "\n";
    }

    if (resultat.products[0]["packaging_text_fr"]) {
        texte +=
            "<span class= 'gras' >Conditionnement : </span>" +
            resultat.products[0]["packaging_text_fr"] +
            "\n" +
            "\n";
    }

    if (resultat.products[0]["categories_old"]) {
        texte +=
            "<span class= 'gras' >Catégories : </span>" +
            resultat.products[0]["categories_old"] +
            "\n" +
            "\n";
    }

    if (resultat.products[0]["preparation_fr"]) {
        texte +=
            "<span class= 'gras' >Préparation : </span>" +
            resultat.products[0]["preparation_fr"] +
            "\n" +
            "\n";
    }

    if (resultat.products[0]["traces_imported"]) {
        texte +=
            "<span class= 'gras' >Traces : </span>" + resultat.products[0]["traces_imported"] + "\n" + "\n";
    }

    if (resultat.products[0]["stores"]) {
        texte += "<span class= 'gras' >Magasins : </span>" + resultat.products[0]["stores"] + "\n" + "\n";
    }

    if (resultat.products[0]["conservation_conditions_fr"]) {
        texte +=
            "<span class= 'gras' >Conservation : </span>" +
            resultat.products[0]["conservation_conditions_fr"] +
            "\n" +
            "\n";
    }

    caracteristiques.innerText = texte;
};

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
