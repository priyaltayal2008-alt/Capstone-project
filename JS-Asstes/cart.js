document.addEventListener('DOMContentLoaded', function () {
    // support multiple cart icons if present
    const cartIcons = document.querySelectorAll('.cart-icon');
    const cartSlider = document.getElementById('cartSlider');
    const cartCloseBtn = document.getElementById('cartCloseBtn');

    function openCart() {
        if (cartSlider) cartSlider.classList.add('open');
    }

    function closeCart() {
        if (cartSlider) cartSlider.classList.remove('open');
    }

    // Attach click to each cart icon (if any)
    if (cartIcons.length > 0) {
        cartIcons.forEach(icon => icon.addEventListener('click', openCart));
    }

    // Attach close button if it exists
    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', closeCart);
    }

    // allow closing with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeCart();
    });

    // Helpful debug when elements are missing (no errors thrown)
    if (!cartSlider) console.warn('cart.js: #cartSlider not found in DOM');
});
