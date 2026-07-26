console.log("customer.js loaded");
function registerCustomer() {

    const fullname = document.getElementById("fullname").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;


    if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
    }


    fetch("http://https://ai-based-loan-management-system.onrender.com", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            fullname,
            mobile,
            email,
            username,
            password
        })

    })

    .then(res=>res.json())

    .then(data=>{

        alert(data.message);

        if(data.success){
            window.location.href="customerlogin.html";
        }

    })

    .catch(err=>{
        console.log(err);
        alert("Server Error");
    });

}




function loginCustomer(){

    const username=document.getElementById("customerUsername").value;
const password=document.getElementById("customerPassword").value;

    fetch("http://https://ai-based-loan-management-system.onrender.com",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            username,
            password
        })

    })


    .then(res=>res.json())

    .then(data=>{


        if(data.success){

            alert("Login Successful");


           localStorage.setItem("customerName", data.customer.fullname);
           localStorage.setItem("customerEmail", data.customer.email);


            window.location.href="customerdashboard.html";


        }

        else{

            alert(data.message);

        }


    })


    .catch(err=>{

        console.log(err);
        alert("Server Error");

    });

}


function loginAndSubmit() {

    const username = document.getElementById("customerUsername").value;
const password = document.getElementById("customerPassword").value;

    fetch("http://https://ai-based-loan-management-system.onrender.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(res => res.json())
    .then(data => {

        if (!data.success) {
            alert(data.message);
            return;
        }

        localStorage.setItem("customerName", data.customer.fullname);
        localStorage.setItem("customerEmail", data.customer.email);

        // Login successful, now submit loan
        submitApplication();

    })
    .catch(err => {
        console.log(err);
        alert("Server Error");
    });

}

function submitApplication() {

    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const loanType = document.getElementById("loanType").value;
    const amount = document.getElementById("amount").value;
    const tenure = document.getElementById("tenure").value;
    const purpose = document.getElementById("purpose").value;

    if (!name || !mobile || !email || !loanType || !amount || !tenure || !purpose) {
        alert("Fill all fields");
        return;
    }

    fetch("http://localhost:3000/submit-loan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            mobile,
            email,
            loanType,
            amount,
            tenure,
            purpose
        })
    })
    .then(res => res.json())
    .then(data => {

         console.log(data); 

        if (data.success) {

            alert("Application Submitted Successfully");

            // OPTIONAL BUT BEST PRACTICE 👇
            localStorage.setItem("applicationId", data.applicationId);

            console.log("Before Dashboard Redirect");

            // redirect to dashboard
           window.location.assign("customerdashboard.html");
        } else {
            alert(data.message || "Submission Failed");
        }

    })
    .catch(err => {
        console.log(err);
        alert("Server Error");
    });
}