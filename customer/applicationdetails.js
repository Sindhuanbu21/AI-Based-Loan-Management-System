document.addEventListener("DOMContentLoaded",()=>{

    loadApplicationDetails();

});


function loadApplicationDetails(){


    const applicationId = localStorage.getItem("selectedApplication");


    if(!applicationId){

        alert("No Application Selected");

        return;

    }



    fetch("https://ai-based-loan-management-system.onrender.com/applications")


    .then(response=>response.json())


    .then(applications=>{


        const application = applications.find(app => 
            app.applicationId === applicationId
        );



        if(!application){

            alert("Application not found");

            return;

        }



        document.getElementById("applicationId").innerText =
        application.applicationId;


        document.getElementById("name").innerText =
        application.name;


        document.getElementById("mobile").innerText =
        application.mobile;


        document.getElementById("email").innerText =
        application.email;


        document.getElementById("loanType").innerText =
        application.loanType;


        document.getElementById("amount").innerText =
        "₹ " + application.amount;


        document.getElementById("tenure").innerText =
        application.tenure;


        document.getElementById("purpose").innerText =
        application.purpose;


        document.getElementById("interestRate").innerText =
        application.interestRate + "%";


        document.getElementById("interest").innerText =
        "₹ " + application.interest;


        document.getElementById("totalPayable").innerText =
        "₹ " + application.totalPayable;


        document.getElementById("emi").innerText =
        "₹ " + application.emi;

        document.getElementById("eligibility").innerText =
        application.eligibility;


        document.getElementById("risk").innerText =
        application.risk;


        document.getElementById("status").innerText =
        application.status;



    })


    .catch(error=>{

        console.log("Error loading details:",error);

    });


}