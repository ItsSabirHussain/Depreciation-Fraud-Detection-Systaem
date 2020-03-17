var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/image-store");
var conn = mongoose.connection;
var multer = require("multer");
var GridFsStorage = require("multer-gridfs-storage");
var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);
var xlsx = require("xlsx");
const cors = require("cors");
// Load User model
const File = require("./models/file.js");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Routes

// Using CORS
app.use(cors());

/** Seting up server to accept cross-origin browser requests */
app.use(function(req, res, next) {
  //allow cross origin requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, PUT, OPTIONS, DELETE, GET"
  );
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json());

/** Setting up storage using multer-gridfs-storage */
var storage = GridFsStorage({
  gfs: gfs,
  filename: function(req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
  /** With gridfs we can store aditional meta-data along with the file */
  metadata: function(req, file, cb) {
    cb(null, { originalname: file.originalname });
  },
  root: "ctFiles" //root name for collection to store files into
});

var upload = multer({
  //multer settings for single upload
  storage: storage
}).single("file");

/** API path that will upload the files */
app.post("/upload", function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }

    res.json({ error_code: 0, err_desc: null, file: req.file });
  });
});

app.get("/file/:filename", function(req, res) {
  console.log("Called");
  gfs.collection("ctFiles"); //set collection name to lookup into
  /** First check if file exists */
  gfs.files
    .find({ filename: req.params.filename })
    .toArray(function(err, files) {
      if (!files || files.length === 0) {
        return res.status(404).json({
          responseCode: 1,
          responseMessage: "error"
        });
      }
      /** create read stream */
      var readstream = gfs.createReadStream({
        filename: files[0].filename,
        root: "ctFiles"
      });
      /** set the proper content type */
      res.set("Content-Type", files[0].contentType);
      /** return response */
      return readstream.pipe(res);
    });
});
app.post("/getallfiles", function(req, res) {
  File.find(function(err, file) {
    if (err) {
      console.log(err);
    } else {
      res.json(file);
    }
  });
});

app.listen("5000", function() {
  console.log("Running on 5000...");
});

app.post("/addfile", (req, res) => {
  console.log(req.body);
  File.findOne({ FileName: req.body.FileName }).then(file => {
    if (file) {
      return res.status(400).json({ ID: "File already exits." });
    } else {
      const newFile = new File({
        CompanyName: req.body.CompanyName,
        Date: req.body.Date,
        OptionalDetails: req.body.OptionalDetails,
        NegligibleRates: req.body.NegligibleRates,
        DepreciationRates: req.body.DepreciationRates,
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
