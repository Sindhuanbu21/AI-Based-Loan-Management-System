document.addEventListener("DOMContentLoaded", () => {

    loadKYCDetails();

});


function loadKYCDetails(){


    const applicationId = localStorage.getItem("selectedKYC");

    if(!applicationId){

        alert("No Application Selected");
        return;

    }


    fetch("http://localhost:3000/applications")


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
            "http://localhost:3000" + application.documents.aadhaar;


            document.getElementById("panLink").href =
            "http://localhost:3000" + application.documents.pan;


            document.getElementById("salaryLink").href =
            "http://localhost:3000" + application.documents.salary;


            document.getElementById("bankLink").href =
            "http://localhost:3000" + application.documents.bank;


            document.getElementById("photoLink").href =
            "http://localhost:3000" + application.documents.photo;


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