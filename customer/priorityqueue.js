document.addEventListener("DOMContentLoaded",()=>{

    loadPriorityQueue();

});



function getPriority(purpose){


    purpose = purpose.toLowerCase();



    if(purpose.includes("medical")){

        return 1;

    }


    else if(purpose.includes("education")){

        return 2;

    }


    else if(purpose.includes("business")){

        return 3;

    }


    else{

        return 4;

    }


}




function getPriorityLabel(priority){


    if(priority === 1){

        return "🔴 High";

    }


    else if(priority === 2){

        return "🟡 Medium";

    }


    else if(priority === 3){

        return "🟢 Normal";

    }


    else{

        return "🔵 Low";

    }


}




function loadPriorityQueue(){


fetch("http://localhost:3000/applications")


.then(response=>response.json())


.then(applications=>{


    applications.sort((a,b)=>{


        return getPriority(a.purpose) - getPriority(b.purpose);


    });



    const table = document.getElementById("priorityTable");


    table.innerHTML="";



    applications.forEach(app=>{


        const priority = getPriority(app.purpose);



        table.innerHTML += `


        <tr>


        <td>

        ${getPriorityLabel(priority)}

        </td>


        <td>

        ${app.applicationId}

        </td>



        <td>

        ${app.name}

        </td>



        <td>

        ${app.loanType}

        </td>



        <td>

        ${app.purpose}

        </td>



        <td>

        ₹ ${Number(app.amount).toLocaleString()}

        </td>



        <td>

        ${app.status}

        </td>



        </tr>


        `;


    });



})


.catch(error=>{

console.log(error);

});


}