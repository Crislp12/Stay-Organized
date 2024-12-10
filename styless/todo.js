"use strict";

let shopByTypeSelect = document.querySelector("#shopByTypeSelect");
let categorySelect = document.querySelector("#categorySelect");
let productsList = document.querySelector("#productsList");

async function getCategories() {
  try {
    let url = "http://localhost:8081/api/categories";
    let response = await fetch(url);
    let categories = await response.json();
    console.log("categories", categories);
    return categories;
  } catch (error) {
    console.log("error:", error.message);
  }
}

function populateCategorySelect(categories) {
  categories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category.categoryId;
    option.innerText = category.name;
    categorySelect.appendChild(option);
  });
}

async function getProducts() {
  try {
    let response = await fetch("http://localhost:8081/api/products");
    let products = await response.json();
    console.log("products", products);
    return products;
  } catch (error) {
    console.log("error:", error.message);
  }
}

function populateProductCards(products) {
  productsList.innerHTML = "";
  for (const product of products) {
    createProductCard(product);
  }
}

function createProductCard(product) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "card";
  cardContainer.style.width = "18rem";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h6");
  cardTitle.className = "card-title";
  cardTitle.textContent = product.productName;

  const cardSubtitle = document.createElement("h6");
  cardSubtitle.className = "card-subtitle mb-2 text-body-secondary";
  cardSubtitle.textContent = "$" + product.unitPrice.toFixed(2);

  const cardText = document.createElement("p");
  cardText.className = "card-text text-body-secondary";
  cardText.textContent = product.supplier;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardSubtitle);
  cardBody.appendChild(cardText);
  cardContainer.appendChild(cardBody);

  productsList.appendChild(cardContainer);
}

async function selectCategory() {
  let byCategoryId = categorySelect.value;
  console.log(byCategoryId);
  let products = await getProducts();
  let filteredProducts = products.filter((product) => product.categoryId == byCategoryId);
  populateProductCards(filteredProducts);
}

async function initializePage() {
  let categories = await getCategories();
  populateCategorySelect(categories);
  let products = await getProducts();
  populateProductCards(products);
}

initializePage();

//Naming patterns
// getXXX
// populateXXX

// fetchXXX
// displayXXX

// loadXXX
// renderXXX