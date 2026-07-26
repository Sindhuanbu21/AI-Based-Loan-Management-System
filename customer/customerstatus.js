// Get latest loan application from backend

fetch("https://ai-based-loan-management-system.onrender.com/get-loans")
.then(response => response.json())

.then(loans => {

    if (loans.length === 0) {

        alert("No loan applications found.");

        return;

    }

    // Get latest application
   const customerEmail = localStorage.getItem("customerEmail");

const customerLoans = loans.filter(loan => loan.email === customerEmail);

if (customerLoans.length === 0) {
    alert("No loan application found for this customer.");
    return;
}

const loan = customerLoans[customerLoans.length - 1];

    document.getElementById("applicationId").innerText = loan.applicationId;
    document.getElementById("customerName").innerText = loan.name;
    document.getElementById("loanAmount").innerText = "₹ " + Number(loan.amount).toLocaleString();

    document.getElementById("interestRate").innerText = loan.interestRate + " %";

    document.getElementById("interestAmount").innerText =
        "₹ " + Number(loan.interest).toLocaleString();

    document.getElementById("emi").innerText =
        "₹ " + Number(loan.emi).toLocaleString() + " / Month";

    document.getElementById("totalPayable").innerText =
        "₹ " + Number(loan.totalPayable).toLocaleString();

    document.getElementById("eligibility").innerText = loan.eligibility;

    document.getElementById("risk").innerText = loan.risk;

    document.getElementById("status").innerText = loan.status;

    // Optional KYC Status
    document.getElementById("kycStatus").innerText = "Verified";

})

.catch(error => {

    console.log(error);

    alert("Unable to load loan details.");

});