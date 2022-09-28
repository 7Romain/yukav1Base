const accordeon = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < accordeon.length; i++) {
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

const code = document.getElementById("rechercher");
let resultat;
const formulaire = document.getElementById("demande");
const imgProduct = document.getElementById("imgProduct");
const imgNutri = document.getElementById("imgNutri");
const imgNova = document.getElementById("imgNova");
const imgEcoscore = document.getElementById("imgEcoscore");
const ingredients = document.getElementById("listeIngredients");
const caracteristiques = document.getElementById("carac");
const tableNut = document.getElementById("tableNutri");

const regex = /[\d]{8,13}/;

const afficherImageProduit = function (resultat) {
    if (resultat.products[0].image_small_url) {
        imgProduct.setAttribute("src", resultat.products[0].image_small_url);
    } else {
        imgProduct.setAttribute("src", "/images/pasImage.svg");
    }
};

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

const afficherTableau = function (resultat) {
    const tableauNutri = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    tableauNutri.appendChild(thead);
    tableauNutri.appendChild(tbody);

    tableNut.appendChild(tableauNutri);

    let row1 = document.createElement("tr");
    let heading1 = document.createElement("th");
    heading1.innerHTML = "Tableau nutritionnel";
    let heading2 = document.createElement("th");
    heading2.innerHTML =
        "Tel que vendu pour " + resultat.products[0]["nutrition_data_per"];
    row1.appendChild(heading1);
    row1.appendChild(heading2);
    thead.appendChild(row1);

    let row2 = document.createElement("tr");
    let row2_data1 = document.createElement("td");
    row2_data1.innerHTML = "Energie";
    let row2_data2 = document.createElement("td");
    row2_data2.innerHTML =
        resultat.products[0]["nutriments"]["energy-kj"] + "kj";
    row2.appendChild(row2_data1);
    row2.appendChild(row2_data2);
    tbody.appendChild(row2);
};

const afficherCaracteristiques = function (resultat) {
    let texte = "";
    if (resultat.products[0]["product_name_fr"]) {
        texte +=
            "Nom Générique : " +
            resultat.products[0]["product_name_fr"] +
            "\n" +
            "\n";
    } else if (resultat.products[0]["product_name_en"]) {
        texte +=
            "Nom Générique : " +
            resultat.products[0]["product_name_en"] +
            "\n" +
            "\n";
    } else {
        texte += "Nom inconnu" + "\n";
    }

    if (resultat.products[0]["brands_imported"]) {
        texte +=
            "Marque : " + resultat.products[0]["brands_imported"] + "\n" + "\n";
    } else if (resultat.products[0]["brands"]) {
        texte += "Marque : " + resultat.products[0]["brands"] + "\n" + "\n";
    }

    if (resultat.products[0]["quantity"]) {
        texte += "Quantité : " + resultat.products[0]["quantity"] + "\n" + "\n";
    }

    if (resultat.products[0]["packaging_text_fr"]) {
        texte +=
            "Conditionnement : " +
            resultat.products[0]["packaging_text_fr"] +
            "\n" +
            "\n";
    }

    if (resultat.products[0]["categories_old"]) {
        texte +=
            "Catégories : " +
            resultat.products[0]["categories_old"] +
            "\n" +
            "\n";
    }

    if (resultat.products[0]["preparation_fr"]) {
        texte +=
            "Préparation : " +
            resultat.products[0]["preparation_fr"] +
            "\n" +
            "\n";
    }

    if (resultat.products[0]["traces_imported"]) {
        texte +=
            "Traces : " + resultat.products[0]["traces_imported"] + "\n" + "\n";
    }

    if (resultat.products[0]["stores"]) {
        texte += "Magasins : " + resultat.products[0]["stores"] + "\n" + "\n";
    }

    if (resultat.products[0]["conservation_conditions_fr"]) {
        texte +=
            "Conservation : " +
            resultat.products[0]["conservation_conditions_fr"] +
            "\n" +
            "\n";
    }

    caracteristiques.innerText = texte;
};

const afficher = function (resultat) {
    afficherImageProduit(resultat);
    afficherScores(resultat);
    afficherIngredients(resultat);
    afficherCaracteristiques(resultat);
    afficherTableau(resultat);
};

formulaire.addEventListener("submit", function (e) {
    if (regex.test(code.value)) {
        e.preventDefault();

        fetch("http://fr.openfoodfacts.org/api/v2/search?code=" + code.value)
            .then((response) => response.json())

            .then(function (data) {
                resultat = data;
                console.table(resultat);
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
