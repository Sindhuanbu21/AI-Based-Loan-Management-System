document.addEventListener("DOMContentLoaded", () => {

    loadKYCApplications();

});


let allApplications = [];


function loadKYCApplications() {

    fetch("https://ai-based-loan-management-system.onrender.com/applications")
    .then(response => response.json())

    .then(applications => {

        allApplications = applications;

        displayApplications(applications);

    })

    .catch(error => {

        console.log("Error :", error);

        alert("Unable to load KYC Applications.");

    });

}



function displayApplications(applications) {

    const tableBody = document.getElementById("kycTableBody");

    tableBody.innerHTML = "";


    applications.forEach(app => {

        let kycStatus = "Pending";
        let button = `
            <button class="disabled-btn" disabled>
                Pending
            </button>
        `;


        // Uploaded Customers
        if (
            app.name.toLowerCase() === "priya" ||
            app.name.toLowerCase() === "vithya"
        ) {

            kycStatus = "Uploaded";

            button = `
                <button
                    class="view-btn"
                    onclick="viewKYC('${app.applicationId}')">
                    View
                </button>
            `;

        }


        tableBody.innerHTML += `

        <tr>

            <td>${app.applicationId}</td>

            <td>${app.name}</td>

            <td class="${kycStatus === "Uploaded" ? "uploaded" : "pending"}">
                ${kycStatus}
            </td>

            <td>
                ${button}
            </td>

        </tr>

        `;

    });

}



// View Button

function viewKYC(applicationId){

    localStorage.setItem("selectedKYC", applicationId);

    window.location.href = "kycdetails.html";

}



// Search

document.getElementById("searchInput").addEventListener("keyup", function(){

    const value = this.value.toLowerCase();

    const filtered = allApplications.filter(app =>

        app.name.toLowerCase().includes(value) ||

        app.applicationId.toLowerCase().includes(value)

    );

    displayApplications(filtered);

});