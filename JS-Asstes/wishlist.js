document.addEventListener('DOMContentLoaded', function () {
  const wishlistIcons = document.querySelectorAll('.wishlist-icon');
  const wishlistSlider = document.getElementById('wishlistSlider');
  const closeBtn = document.getElementById('closeBtn');

  console.log('wishlist.js: loaded', { icons: wishlistIcons.length, hasSlider: !!wishlistSlider, hasCloseBtn: !!closeBtn });

  function openWishlist() {
    console.log('wishlist.js: openWishlist called');
    if (wishlistSlider) wishlistSlider.classList.add('open');
  }

  function closeWishlist() {
    console.log('wishlist.js: closeWishlist called');
    if (wishlistSlider) wishlistSlider.classList.remove('open');
  }

  if (wishlistIcons.length > 0) {
    wishlistIcons.forEach(icon => {
      icon.addEventListener('click', openWishlist);
      console.log('wishlist.js: attached click listener to icon', icon);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeWishlist);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeWishlist();
  });

  if (!wishlistSlider) console.warn('wishlist.js: #wishlistSlider not found in DOM');
});