document.addEventListener("DOMContentLoaded", () => {

    loadKYCDetails();

});


function loadKYCDetails(){


    const applicationId = localStorage.getItem("selectedKYC");

    if(!applicationId){

        alert("No Application Selected");
        return;

    }


    fetch("https://ai-based-loan-management-system.onrender.com/applications")


    .then(response => response.json())


    .then(applications => {


        const application = applications.find(app =>
            app.applicationId === applicationId
        );


        if(!application){

            alert("Application not found");
            return;

        }



        document.getElementById("applicationId").innerText =
        application.applicationId;



        document.getElementById("customerName").innerText =
        application.name;



        if(application.documents){


            document.getElementById("kycStatus").innerText =
            "Documents Uploaded";


            document.getElementById("aadhaarLink").href =
            "https://ai-based-loan-management-system.onrender.com" + application.documents.aadhaar;

            document.getElementById("panLink").href =
            "https://ai-based-loan-management-system.onrender.com" + application.documents.pan;

            document.getElementById("salaryLink").href =
            "https://ai-based-loan-management-system.onrender.com" + application.documents.salary;

            document.getElementById("bankLink").href =
            "https://ai-based-loan-management-system.onrender.com" + application.documents.bank;

           document.getElementById("photoLink").href =
           "https://ai-based-loan-management-system.onrender.com" + application.documents.photo;


        }
        else{


            document.getElementById("kycStatus").innerText =
            "Documents Pending";


        }



    })


    .catch(error => {

        console.log(error);

    });


}