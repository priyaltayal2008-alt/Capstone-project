const cartIcon = document.querySelector(".cart-icon");
const cartSlider = document.getElementById("cartSlider");
const cartCloseBtn = document.getElementById("cartCloseBtn");

cartCloseBtn.addEventListener("click", function() {
    cartSlider.classList.remove("open");
});

function toggleCart() {
    cartSlider.classList.add("open");
}

cartIcon.addEventListener("click", toggleCart);
