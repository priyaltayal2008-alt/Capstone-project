let emailInput = document.getElementById("email");
let emailError = document.getElementById("emailError");

emailInput.addEventListener("input", function () {
    let emailValue = emailInput.value;

    if (emailValue.endsWith("@gmail.com") || emailValue === "") {
        emailError.textContent = "";
    } else {
        emailError.textContent = "❌ Invalid email syntax";
    }
});