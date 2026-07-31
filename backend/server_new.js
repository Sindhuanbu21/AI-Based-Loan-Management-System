require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const LoanApplication = require("./models/loanapplication");
const Groq = require("groq-sdk");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Customer = require("./models/Customer");

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const app = express();

app.use(cors());
app.use(express.json());

// ============================
// MONGODB CONNECTION
// ============================


// ============================
// MONGODB CONNECTION
// ============================

mongoose.connect(
  "mongodb://loanuser:loan%40123@ac-yabfp6h-shard-00-00.6xmzzcn.mongodb.net:27017,ac-yabfp6h-shard-00-01.6xmzzcn.mongodb.net:27017,ac-yabfp6h-shard-00-02.6xmzzcn.mongodb.net:27017/?ssl=true&replicaSet=atlas-53wx8b-shard-0&authSource=admin&appName=Cluster0"
)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));


// ============================
// CREATE UPLOAD FOLDER
// ============================

const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

app.use("/uploads", express.static(uploadPath));


// ============================
// MULTER
// ============================

const storage = multer.diskStorage({

    destination: (req,file,cb)=>{
        cb(null,uploadPath);
    },

    filename:(req,file,cb)=>{

        cb(
            null,
            Date.now()+"-"+file.originalname.replace(/[^a-zA-Z0-9.]/g,"_")
        );

    }

});

const upload = multer({storage});


// ============================
// HOME
// ============================

app.get("/",(req,res)=>{

    res.send("Loan Management Server Running");

});

// ============================
// CUSTOMER REGISTRATION
// ============================

app.post("/register", async (req, res) => {

    try {

        const {
            fullname,
            mobile,
            email,
            username,
            password
        } = req.body;

        // Check existing username
        const existingCustomer = await Customer.findOne({ username });

        if (existingCustomer) {

            return res.json({
                success: false,
                message: "Username already exists"
            });

        }

        // Save customer
        const newCustomer = new Customer({

            fullname,
            mobile,
            email,
            username,
            password

        });

        await newCustomer.save();

        res.json({

            success: true,
            message: "Registration Successful"

        });

    }
   catch (err) {

    console.error("REGISTER ERROR:", err);

    res.status(500).json({
        success: false,
        message: err.message
    });

}

});
    


// ============================
// CUSTOMER LOGIN
// ============================

app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const customer = await Customer.findOne({

            username,
            password

        });

        if (!customer) {

            return res.json({

                success: false,
                message: "Invalid Username or Password"

            });

        }

        res.json({

            success: true,
            customer

        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

});

// ============================
// SUBMIT LOAN APPLICATION
// ============================

app.post("/submit-loan", (req, res) => {

    const filePath = path.join(__dirname, "applications.json");

    let applications = [];

    if (fs.existsSync(filePath)) {

        try {
            applications = JSON.parse(fs.readFileSync(filePath, "utf8"));
        } catch {
            applications = [];
        }

    }

    const loanAmount = Number(req.body.amount);

    const tenureMonths = parseInt(req.body.tenure);

    const tenureYears = tenureMonths / 12;

    const loanType = req.body.loanType;

    // ============================
    // INTEREST RATE
    // ============================

    let interestRate = 10;

    switch (loanType) {

        case "Home Loan":
            interestRate = 8.5;
            break;

        case "Personal Loan":
            interestRate = 12;
            break;

        case "Education Loan":
            interestRate = 7;
            break;

        case "Business Loan":
            interestRate = 10;
            break;

        default:
            interestRate = 10;

    }

    // ============================
    // CALCULATIONS
    // ============================

    const interest =
        (loanAmount * interestRate * tenureYears) / 100;

    const totalPayable =
        loanAmount + interest;

    const emi =
        Math.round(totalPayable / tenureMonths);

    // ============================
    // ELIGIBILITY
    // ============================

    let eligibility = "Eligible";

    if (loanAmount > 500000) {

        eligibility = "Not Eligible";

    }
    else if (loanAmount > 200000) {

        eligibility = "Under Review";

    }

    // ============================
    // RISK
    // ============================

    let risk = "Low";

    if (loanAmount > 500000) {

        risk = "High";

    }
    else if (loanAmount > 200000) {

        risk = "Medium";

    }

    // ============================
    // STATUS
    // ============================

    const status = "Pending";

    // ============================
    // SAVE
    // ============================

   const newApplication = {

        applicationId: "LA" + Date.now(),

        ...req.body,

        tenure: tenureMonths,

        interestRate,

        interest: Math.round(interest),

        totalPayable: Math.round(totalPayable),

        emi,
 
        eligibility,

        risk,

        status

    };

    const application = new LoanApplication(newApplication);

application.save()

.then(() => {

    res.json({

        success: true,

        applicationId: newApplication.applicationId,

        message: "Application Submitted Successfully"

    });

})

.catch((err) => {

    console.error("SAVE ERROR:", err);

    res.status(500).json({
        success: false,
        message: err.message
    });

});

});


// ============================
// GET ALL LOANS
// ============================

app.get("/get-loans", (req, res) => {

    const filePath = path.join(__dirname, "applications.json");

    if (!fs.existsSync(filePath)) {

        return res.json([]);

    }

    const data = fs.readFileSync(filePath, "utf8");

    res.json(JSON.parse(data));

});


// ============================
// KYC DOCUMENT UPLOAD
// ============================

app.post("/upload", upload.single("file"), async (req, res) => {

    try {

        const email = req.body.customerEmail;
        const documentType = req.body.documentType;

        const application = await LoanApplication.findOne({ email: email });

        if (!application) {

            return res.status(404).json({
                success: false,
                message: "Application not found"
            });

        }

        const fileURL = "/uploads/" + req.file.filename;

        if (!application.documents) {
            application.documents = {};
        }

        application.documents[documentType] = fileURL;

        await application.save();

        res.json({

            success: true,
            message: "Document uploaded successfully",
            file: req.file.filename

        });

    }
    catch (error) {

        console.log("UPLOAD ERROR:", error);

        res.status(500).json({

            success: false,
            message: "Upload failed"

        });

    }

});
app.get("/test", (req, res) => {
    res.send("SERVER NEW WORKING");
});

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const completion = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are Smart Loan Assistant.

You are an intelligent AI assistant.

Your main expertise includes:
- Loans
- EMI
- Interest Rates
- Banking
- KYC
- Credit Score
- Personal Finance

You can ALSO answer:
- Programming
- Technology
- Science
- Mathematics
- History
- Geography
- Education
- Current Affairs
- General Knowledge
- Coding
- Career Guidance

Rules:
- Answer every question accurately.
- Give detailed answers.
- Reply in the same language as the user.
- Never repeat the same answer unnecessarily.
- If you don't know something, honestly say you don't know.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            temperature: 0.7,
            max_tokens: 1024
        });

        res.json({
            reply: completion.choices[0].message.content
        });

    } catch (error) {
        console.error("GROQ ERROR:", error);

        res.status(500).json({
            reply: "Sorry! AI is temporarily unavailable."
        });
    }
});

app.get("/applications", async (req, res) => {

    try {

        const applications = await LoanApplication.find();

        res.json(applications);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Failed to load applications"
        });

    }

});

// ============================
// START SERVER
// ============================
console.log("CHAT ROUTE REGISTERED");
app.listen(3000, () => {

    console.log("🚀 Server running on http://localhost:3000");

});