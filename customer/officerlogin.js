window.onload = function () {

    document.getElementById("officerEmail").value = "";
    document.getElementById("officerPassword").value = "";

};

document.getElementById("officerLoginForm").addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("officerEmail").value.trim();
    const password = document.getElementById("officerPassword").value.trim();

    const officerEmail = "officer@gmail.com";
    const officerPassword = "12345";

    if(email === officerEmail && password === officerPassword){

        localStorage.setItem("role","officer");
        localStorage.setItem("officerEmail", email);

        window.location.href = "officerdashboard.html";

    }else{

        alert("Invalid Officer Login");

    }

});