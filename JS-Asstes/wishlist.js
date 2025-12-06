let wishlistIcon = document.querySelector(".wishlist-icon");
let wishlistSlider = document.getElementById("wishlistSlider");
let btn = document.getElementById("closeBtn")

btn.addEventListener("click",function(){
    wishlistSlider.classList.remove("open");
})


function toggleWishlist() {
  wishlistSlider.classList.add("open");
}


wishlistIcon.addEventListener("click", toggleWishlist);