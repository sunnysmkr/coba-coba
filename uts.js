let cartCount = 0; 
let cartItems = []; 

function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

function addToCart(productName, productPrice) {
  cartItems.push({ name: productName, price: productPrice });
  cartCount++;
  updateCartCount(); 
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  cartCount--; 
  updateCartCount();
  viewCart();
}

function viewCart() {
  const cartSection = document.getElementById("cart");
  const cartItemsList = document.getElementById("cart-items-list");
  const cartTotal = document.getElementById("cart-total");

  cartItemsList.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - Rp${item.price}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
      removeFromCart(index);
    };

    listItem.appendChild(removeButton);
    cartItemsList.appendChild(listItem);

    total += item.price;
  });

  cartTotal.textContent = `Total: Rp${total}`;

  cartSection.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productName =
        this.closest(".product-card").querySelector("h3").textContent; 
      const productPrice = parseInt(
        this.closest(".product-card")
          .querySelector(".price")
          .textContent.replace("Rp", "")
          .replace(".", "")
      );

      addToCart(productName, productPrice);
    });
  });

  const viewCartButton = document.querySelector(".view-cart-btn");
  if (viewCartButton) {
    viewCartButton.addEventListener("click", viewCart);
  }
});
