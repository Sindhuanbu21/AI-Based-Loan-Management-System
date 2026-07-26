document.addEventListener("DOMContentLoaded",()=>{

    loadApplications();

});


function loadApplications(){


    fetch("https://ai-based-loan-management-system.onrender.com/applications")

    .then(response=>response.json())

    .then(applications=>{


        const table=document.getElementById("applicationTable");


        table.innerHTML="";


        applications.forEach(app=>{


            let row=`


            <tr>

                <td>${app.applicationId}</td>

                <td>${app.name}</td>

                <td>${app.loanType}</td>

                <td>₹${app.amount}</td>

                <td>${app.purpose}</td>

                <td>${app.eligibility}</td>

                <td>${app.risk}</td>

                <td>${app.status}</td>

                <td>
                
                <button onclick="viewApplication('${app.applicationId}')">
                    View
                </button>

                </td>


            </tr>


            `;


            table.innerHTML += row;


        });



    })


    .catch(error=>{

        console.log("Error:",error);

    });


}



function viewApplication(applicationId){

    localStorage.setItem(
        "selectedApplication",
        applicationId
    );


    window.location.href="applicationdetails.html";

}