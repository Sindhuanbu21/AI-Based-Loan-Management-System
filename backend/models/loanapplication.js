const mongoose = require("mongoose");

const loanApplicationSchema = new mongoose.Schema({

    applicationId: String,

    name: String,

    mobile: String,

    email: String,

    loanType: String,

    amount: Number,

    tenure: Number,

    purpose: String,

    interestRate: Number,

    interest: Number,

    totalPayable: Number,

    emi: Number,

    eligibility: String,

    risk: String,

    status: String,

    documents: {
        type: Object,
        default: {}
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("LoanApplication", loanApplicationSchema);