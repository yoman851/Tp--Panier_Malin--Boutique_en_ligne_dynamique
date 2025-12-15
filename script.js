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
