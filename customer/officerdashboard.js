if (localStorage.getItem("role") !== "officer") {

    alert("Access Denied! Please login as Officer.");

    window.location.href = "officerlogin.html";

}function openApplications(){

    window.location.href="applications.html";

}

function openKYC(){

    window.location.href="kycverification.html";

}

function openPriority(){

    window.location.href="priorityqueue.html";

}

function openHistory(){

    window.location.href="history.html";

}