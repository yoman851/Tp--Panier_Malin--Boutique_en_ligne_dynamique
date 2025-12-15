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
