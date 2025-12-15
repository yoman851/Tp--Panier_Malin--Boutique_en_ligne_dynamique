const produits = [
    {
        id: 1,
        nom: "Thé Vert Bio",
        prix: 12.99,
        image: "https://placehold.co/150",
    },
    {
        id: 2,
        nom: "Café Arabica",
        prix: 8.5,
        image: "https://placehold.co/150",
    },
    {
        id: 3,
        nom: "Infusion Menthe",
        prix: 5.0,
        image: "https://placehold.co/150",
    },
    {
        id: 4,
        nom: "Chocolat Chaud",
        prix: 15.0,
        image: "https://placehold.co/150",
    },
];
// ------------------------------------------------
//  2. Variables globales
//  ------------------------------------------------

let productList = [...produits];
let panier = [];

// ------------------------------------------------
// A. Affichage des produits (DOM)
// ------------------------------------------------

function afficherProduits() {
    const productListContainer = document.getElementById("produits-container");
    productListContainer.innerHTML = "";

    productList.forEach((produit) => {
        const produitsCards = document.createElement("div");
        produitsCards.classList.add("grid-produits-cards");

        const imageElement = document.createElement("img");
        imageElement.setAttribute("src", produit.image);
        imageElement.setAttribute("alt", produit.nom);

        const nameElement = document.createElement("h3");
        nameElement.textContent = produit.nom;

        const basketElement = document.createElement("button");
        basketElement.classList.add("basketButton");
        basketElement.setAttribute("id", `add-to-cart-${produit.id}`);
        basketElement.textContent = `${produit.prix}€`;

        basketElement.addEventListener("click", () => ajouterAuPanier(produit));

        produitsCards.appendChild(imageElement);
        produitsCards.appendChild(nameElement);
        produitsCards.appendChild(basketElement);
        productListContainer.appendChild(produitsCards);
    });
}

afficherProduits();

// ------------------------------------------------
// B. Gestion du Panier
// ------------------------------------------------

function ajouterAuPanier(produit) {
    const produitExistant = panier.find((item) => item.id === produit.id);

    if (produitExistant) {
        produitExistant.quantity++;
    } else {
        const produitAvecQuantite = { ...produit, quantity: 1 };
        panier.push(produitAvecQuantite);
    }

    mettreAJourPanier();
}

function mettreAJourPanier() {
    const list = document.getElementById("panier-liste");
    list.innerHTML = "";

    if (panier.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Votre panier est vide.";
        list.appendChild(message);
        document.getElementById("montant-total").textContent = "0.00€";
        return;
    }

    const panierTable = document.createElement("table");
    panierTable.setAttribute("id", "panier-table");

    const header = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headerImg = document.createElement("th");
    const headerNom = document.createElement("th");
    const headerPrixUnit = document.createElement("th");
    const headerQuantity = document.createElement("th");
    const headerTotLigne = document.createElement("th");
    const headerAction = document.createElement("th");

    headerImg.textContent = "";
    headerNom.textContent = "Produit";
    headerPrixUnit.textContent = "Prix";
    headerQuantity.textContent = "Quantité";
    headerTotLigne.textContent = "Sous-total";
    headerAction.textContent = "Supprimer";

    headerRow.appendChild(headerImg);
    headerRow.appendChild(headerNom);
    headerRow.appendChild(headerPrixUnit);
    headerRow.appendChild(headerQuantity);
    headerRow.appendChild(headerTotLigne);
    headerRow.appendChild(headerAction);

    header.appendChild(headerRow);
    panierTable.appendChild(header);

    const panierBody = document.createElement("tbody");
    let totalPanier = 0;

    panier.forEach((produit) => {
        const panierLigne = document.createElement("tr");
        panierLigne.setAttribute("id", `panierLigne-${produit.id}`);

        const panierImage = document.createElement("td");
        const panierImageContent = document.createElement("img");
        panierImageContent.setAttribute("src", produit.image);
        panierImageContent.setAttribute("alt", produit.nom);
        panierImage.appendChild(panierImageContent);

        const panierNom = document.createElement("td");
        panierNom.textContent = produit.nom;

        const panierPrixUnit = document.createElement("td");
        panierPrixUnit.textContent = `${produit.prix}€`;

        const panierQuantity = document.createElement("td");
        panierQuantity.textContent = produit.quantity;

        const panierSsTotal = document.createElement("td");
        const sousTotal = produit.quantity * parseFloat(produit.prix);
        panierSsTotal.textContent = `${sousTotal.toFixed(2)}€`;

        totalPanier += sousTotal;

        const panierSupression = document.createElement("td");
        const panierSupressionBtn = document.createElement("button");
        panierSupressionBtn.textContent = "Retirer du panier";
        panierSupressionBtn.className = "btnSuprimer";
        panierSupression.appendChild(panierSupressionBtn);

        panierSupressionBtn.addEventListener("click", () => {
            panier = panier.filter((item) => item.id !== produit.id);
            mettreAJourPanier();
        });

        panierLigne.appendChild(panierImage);
        panierLigne.appendChild(panierNom);
        panierLigne.appendChild(panierPrixUnit);
        panierLigne.appendChild(panierQuantity);
        panierLigne.appendChild(panierSsTotal);
        panierLigne.appendChild(panierSupression);

        panierBody.appendChild(panierLigne);
    });

    panierTable.appendChild(panierBody);
    list.appendChild(panierTable);

    const montantTotal = document.getElementById("montant-total");
    montantTotal.textContent = `${totalPanier.toFixed(2)}€`;
}

// ------------------------------------------------
// D. Validation de Commande (formulaire)
// ------------------------------------------------

// Ciblage de l'emplacement du formulaire
const form = document.createElement("form");
const div = document.getElementById("message-feedback");
const mailInput = document.getElementById("email-client");

// Création des labels et inputs
const labelNameInput = document.createElement("label");
const nameInput = document.createElement("input");
const labelSurnameInput = document.createElement("label");
const surnameInput = document.createElement("input");
const labelAdress = document.createElement("label");
const AdressInput = document.createElement("input");
const textAreaLabel = document.createElement("label");
const textAreaInput = document.createElement("textarea");

// Ajout d'ID
nameInput.id = "nameInput";
nameInput.type = "text";
labelNameInput.setAttribute("for", nameInput.id);
labelNameInput.textContent = "Votre nom";

surnameInput.id = "surnameInput";
surnameInput.type = "text";
labelSurnameInput.setAttribute("for", surnameInput.id);
labelSurnameInput.textContent = "Votre prénom";

AdressInput.id = "adressInput";
AdressInput.type = "text";
labelAdress.setAttribute("for", AdressInput.id);
labelAdress.textContent = "Votre adresse";

textAreaInput.id = "textAreaInput";
textAreaLabel.setAttribute("for", textAreaInput.id);
textAreaLabel.textContent = "Informations supplémentaires";

// Insertion des éléments dans le formulaire
form.appendChild(labelNameInput);
form.appendChild(nameInput);
form.appendChild(labelSurnameInput);
form.appendChild(surnameInput);
form.appendChild(labelAdress);
form.appendChild(AdressInput);
form.appendChild(textAreaLabel);
form.appendChild(textAreaInput);

// Insertion du formulaire dans la div cible
div.appendChild(form);

// Bouton de commande existant dans le HTML
const submit = document.getElementById("btn-commander");

// Regex email
const testregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Gestion de la soumission (au clic sur le bouton)
submit.addEventListener("click", function (e) {
    e.preventDefault();

    let testValid = true;

    resetErrors();

    // Validation du nom
    if (nameInput.value.trim().length < 3) {
        displayError(
            nameInput.id,
            "Le nom doit contenir au moins 3 caractères.",
            nameInput
        );
        testValid = false;
    }

    // Validation du prénom
    if (surnameInput.value.trim().length < 2) {
        displayError(
            surnameInput.id,
            "Le prénom doit contenir au moins 2 caractères.",
            surnameInput
        );
        testValid = false;
    }

    // Validation de l'email
    if (!testregex.test(mailInput.value.trim())) {
        displayError(
            mailInput.id,
            "Veuillez entrer une adresse email valide.",
            mailInput
        );
        testValid = false;
    }

    // Validation de l'adresse
    if (AdressInput.value.trim().length < 5) {
        displayError(
            AdressInput.id,
            "L'adresse doit contenir au moins 5 caractères.",
            AdressInput
        );
        testValid = false;
    }

    // Validation du panier (total != 0.00€)
    const montantTotal =
        document.getElementById("montant-total").textContent || "0.00€";
    if (montantTotal === "0.00€") {
        displayError(
            submit.id,
            "Erreur : Votre panier est vide, veuillez sélectionner au minimum 1 article.",
            submit
        );
        testValid = false;
    }

    if (testValid) {
        // Message de succès dans le DOM
        const successMsg = document.createElement("p");
        successMsg.textContent = "Commande validée avec succès !";
        successMsg.classList.add("success");
        div.appendChild(successMsg);
    }
});

// Affichage d'un message d'erreur sous l'élément ciblé
function displayError(elementId, message, inputElement) {
    const pError = document.createElement("p");
    pError.textContent = message;
    pError.classList.add("error");
    inputElement.classList.add("inputerror");

    const target = document.getElementById(elementId);
    if (target && target.parentNode) {
        target.parentNode.insertBefore(pError, target.nextSibling);
    } else if (target) {
        target.appendChild(pError);
    } else {
        div.appendChild(pError);
    }
}

// Réinitialisation des messages d'erreur
function resetErrors() {
    const errorElements = document.querySelectorAll(".error");
    errorElements.forEach((element) => element.remove());

    const inputElements = document.querySelectorAll("input, textarea, button");
    inputElements.forEach((input) => {
        input.classList.remove("inputerror");
    });
}
