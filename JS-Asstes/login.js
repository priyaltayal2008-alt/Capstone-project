let form = document.getElementById("loginForm");
let email = document.getElementById("email");
let password = document.getElementById("password");
form.addEventListener("submit", function(event) {
    if (email.value === "" || password.value === "") {
        event.preventDefault(); 
        alert("To Login Fill The Details As Mentioned");
    }
});

document.getElementById("togglePass").addEventListener("click", function () {
    const pass = document.getElementById("password");
    if (pass.type === "password") {
        pass.type = "text";
        this.textContent = "🚫";
    } else {
        pass.type = "password";
        this.textContent = "👁️";
    }
});