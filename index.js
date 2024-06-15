const products = Array.from({ length: 65 }, (_, i) => ({
  id: i + 1,
  name: ["Sytherine", "Leviosa", "Lolito", "Respira"][i % 4],
  description: [
    "Stylish cafe chair",
    "Stylish cafe chair",
    "Luxury big sofa",
    "Outdoor bar table and stool",
  ][i % 4],
  price: ["Rp 2.500.000", "Rp 4.500.000", "Rp 7.000.000", "Rp 1500.000"][i % 4],
  image: `./img/imagem${(i % 4) + 1}.png`,
  oldPrice:
    i % 4 === 0 || i % 4 === 2
      ? ["Rp 3.500.000", "", "Rp 14.000.000", ""][i % 4]
      : null,
  discount: Math.floor(Math.random() * 100),
}));

let itemsPerPage = 16;
let currentPage = 1;

function displayProducts() {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, products.length);
  const currentProducts = products.slice(startIndex, endIndex);

  currentProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;
    productCard.appendChild(productImage);

    const productData = document.createElement("div");
    productData.className = "product-data";
    const productName = document.createElement("h3");
    productName.textContent = product.name;
    productData.appendChild(productName);

    const productDescription = document.createElement("p");
    productDescription.textContent = product.description;
    productData.appendChild(productDescription);

    const productPrice = document.createElement("div");
    productPrice.className = "price-container";

    const price = document.createElement("span");
    price.textContent = product.price;
    price.className = `price`;
    productPrice.appendChild(price);

    const discountContainer = document.createElement("div");
    discountContainer.className = `discount-container`;

    const discountSpan = document.createElement("span");
    discountSpan.innerHTML = `${product.discount}%`;
    discountContainer.appendChild(discountSpan);

    if (product.oldPrice) {
      const oldPrice = document.createElement("span");
      oldPrice.className = "old-price";
      oldPrice.textContent = product.oldPrice;
      productPrice.appendChild(oldPrice);
    }

    productData.appendChild(productPrice);
    productCard.appendChild(productData);
    productCard.appendChild(discountContainer);

    // Adiciona os novos elementos
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const seeDetailsButton = document.createElement("button");
    seeDetailsButton.className = "see-details";
    seeDetailsButton.textContent = "See Details";
    overlay.appendChild(seeDetailsButton);

    const actions = document.createElement("div");
    actions.className = "actions";

    // Link do Share
    const share = document.createElement("a");
    share.className = "share";
    share.href = "#"; // Substitua pelo link real
    const shareIcon = document.createElement("img");
    shareIcon.src = "./svg/share.svg"; // Substitua pelo caminho real do ícone
    shareIcon.alt = "Share Icon";
    share.appendChild(shareIcon);
    const shareText = document.createElement("span");
    shareText.textContent = "Share";
    share.appendChild(shareText);
    actions.appendChild(share);

    // Link do Compare
    const compare = document.createElement("a");
    compare.className = "compare";
    compare.href = "#"; // Substitua pelo link real
    const compareIcon = document.createElement("img");
    compareIcon.src = "./svg/compare.svg"; // Substitua pelo caminho real do ícone
    compareIcon.alt = "Compare Icon";
    compare.appendChild(compareIcon);
    const compareText = document.createElement("span");
    compareText.textContent = "Compare";
    compare.appendChild(compareText);
    actions.appendChild(compare);

    // Link do Like
    const like = document.createElement("a");
    like.className = "like";
    like.href = "#"; // Substitua pelo link real
    const likeIcon = document.createElement("img");
    likeIcon.src = "./svg/likecard.svg"; // Substitua pelo caminho real do ícone
    likeIcon.alt = "Like Icon";
    like.appendChild(likeIcon);
    const likeText = document.createElement("span");
    likeText.textContent = "Like";
    like.appendChild(likeText);
    actions.appendChild(like);

    overlay.appendChild(actions);
    productCard.appendChild(overlay);

    productContainer.appendChild(productCard);
  });

  document.getElementById("startIndex").textContent = startIndex + 1;
  document.getElementById("endIndex").textContent = endIndex;
  document.getElementById("totalResults").textContent = products.length;
}
function changeItemsPerPage() {
  const select = document.getElementById("itemsPerPage");
  itemsPerPage = parseInt(select.value);
  currentPage = 1;
  displayProducts();
}




function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
  }
}

function nextPage() {
  if (currentPage < Math.ceil(products.length / itemsPerPage)) {
    currentPage++;
    displayProducts();
  }
}

function sortByAlphabet() {
  products.sort((a, b) => a.name.localeCompare(b.name));
  currentPage = 1;
  displayProducts();
}

function sortByPrice() {
  products.sort((a, b) => {
    // Extrair e converter os valores de preço para números
    const priceA = parseFloat(a.price.replace(/\D/g, ''));
    const priceB = parseFloat(b.price.replace(/\D/g, ''));
    
    // Comparar os valores numéricos
    return priceA - priceB;
  });
  currentPage = 1;
  displayProducts();
}

function sortProducts() {
  const sortSelector = document.getElementById("sortSelector");
  const selectedOption = sortSelector.value;

  if (selectedOption === "alphabetical") {
    sortByAlphabet();
  } else if (selectedOption === "price") {
    sortByPrice();
  }
}
function toggleFilterOptions() {
  const filterOptions = document.getElementById("filterOptions");
  filterOptions.classList.toggle("show");
}



function toggleFilterSelector() {
  const filterSelector = document.getElementById("filterSelector");
  filterSelector.style.display = filterSelector.style.display === "none" ? "block" : "none";
}

window.onload = displayProducts;

function validateEmail() {
  const email = document.getElementById('email').value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(email)) {
      alert('Thank you for subscribing!');
  } else {
      alert('Please enter a valid email address.');
  }
}
