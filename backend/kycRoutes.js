const express = require("express");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

// file storage (use your existing uploads folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// KYC upload API
router.post(
  "/upload",
  upload.fields([
    { name: "aadhaar" },
    { name: "pan" },
    { name: "salarySlip" },
    { name: "bankStatement" },
    { name: "passportPhoto" }
  ]),
  (req, res) => {

    const files = req.files;

    let kycStatus = "Pending";

    if (
      files?.aadhaar &&
      files?.pan &&
      files?.salarySlip &&
      files?.bankStatement &&
      files?.passportPhoto
    ) {
      kycStatus = "Verified";
    }

    // OPTIONAL: store in applications.json
    const data = {
      kycStatus,
      files: {
        aadhaar: !!files?.aadhaar,
        pan: !!files?.pan,
        salarySlip: !!files?.salarySlip,
        bankStatement: !!files?.bankStatement,
        passportPhoto: !!files?.passportPhoto
      }
    };

    fs.writeFileSync("backend/applications.json", JSON.stringify(data, null, 2));

    res.json(data);
  }
);

module.exports = router;