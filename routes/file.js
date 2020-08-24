const express = require("express");
const router = express.Router();

// Load User model
const File = require("../models/file.js");

router.post("/addfile", (req, res) => {
  console.log(req.body);
  File.findOne({ FileName: req.body.FileName }).then(mem => {
    if (file) {
      return res.status(400).json({ ID: "File already exits." });
    } else {
      const newFile = new File({
        CompanyName: req.body.CompanyName,
        Date: req.body.Date,
        OptionalDetails: req.body.OptionalDetails,
        NegligibleRates: req.body.NegligibleRates,
        FileName: req.body.FileName,
        FileID: req.body.FileID
      });

      newFile
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});
module.exports = router;
