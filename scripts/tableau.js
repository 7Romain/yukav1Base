/**
 *Creer le tableau nutritionnel et le remplit si les info existent.
 * @param {*} resultat = json du produit
 *
 */
export const afficherTableau = function (resultat) {
    const tableNut = document.getElementById("tableNutri");

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
    heading2.innerHTML =
        "pour " + resultat.products[0]["nutrition_data_prepared_per"];
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
