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
        application.documents.aadhaar;

    document.getElementById("panLink").href =
        application.documents.pan;

    document.getElementById("salaryLink").href =
        application.documents.salary;

    document.getElementById("bankLink").href =
        application.documents.bank;

    document.getElementById("photoLink").href =
        application.documents.photo;

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