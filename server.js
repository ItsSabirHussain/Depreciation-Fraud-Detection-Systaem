var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// Connecting to mongodb
// Local Database Address
const localdbAddress =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/DFD_FYP_SE_2020_Database";
console.log(localdbAddress);
console.log("Here");
mongoose.connect(localdbAddress);
var conn = mongoose.connection;

var multer = require("multer");
var GridFsStorage = require("multer-gridfs-storage");
var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);
const cors = require("cors");
// Load User model
const File = require("./models/file.js");

// MiddleWare
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

//Seting up server to accept cross-origin browser requests
app.use(function (req, res, next) {
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

//Setting up storage using multer-gridfs-storage
var storage = GridFsStorage({
  gfs: gfs,
  filename: function (req, file, cb) {
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

  //With gridfs we can store aditional meta-data along with the file
  metadata: function (req, file, cb) {
    cb(null, { originalname: file.originalname });
  },
  root: "ctFiles", //root name for collection to store files into
});

var upload = multer({
  //multer settings for single upload
  storage: storage,
}).single("file");

//API path that will upload the files
app.post("/upload", function (req, res) {
  console.log("I am in upload file.");
  upload(req, res, function (err) {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }

    res.json({ error_code: 0, err_desc: null, file: req.file });
  });
});

// Route for get single file
app.get("/file/:filename", function (req, res) {
  console.log("I am in Get Single File");
  gfs.collection("ctFiles"); //set collection name to lookup into
  /** First check if file exists */
  gfs.files
    .find({ filename: req.params.filename })
    .toArray(function (err, files) {
      if (!files || files.length === 0) {
        return res.status(404).json({
          responseCode: 1,
          responseMessage: "error",
        });
      }
      /** create read stream */
      var readstream = gfs.createReadStream({
        filename: files[0].filename,
        root: "ctFiles",
      });
      /** set the proper content type */
      res.set("Content-Type", files[0].contentType);
      /** return response */

      return readstream.pipe(res);
    });
});

// Route for get all files
app.post("/getallfiles", function (req, res) {
  File.find({ UserID: req.body.UserID }, function (err, file) {
    if (err) {
      console.log(err);
    } else {
      console.log(file);
      res.json(file);
    }
  });
});

// Route for get single file data
app.post("/getfiledata", function (req, res) {
  console.log("I am in Get File Data");
  File.findOne({
    CompanyName: req.body.CompanyName,
    UserID: req.body.UserID,
    Date: req.body.date,
  }).then((file) => {
    if (file) {
      return res.json(file);
    } else {
      return res.status(400).json({ ID: "No file found." });
    }
  });
});

// Route for extract new depreciation
app.post("/extnewdep", function (req, res) {
  File.find({
    CompanyName: req.body.CompanyName,
    UserID: req.body.UserID,

    Date: {
      $gte: new Date(req.body.SDate),
      $lt: new Date(req.body.EDate),
    },
  }).then((files) => {
    var pData = {};
    var AssetsName = [];
    var Dates = [];
    var AssetsValue = [];
    var Salvage = [];
    var Depreciation = [];

    console.log("I am in Generate New Depreciation Values");

    files.map((data) => {
      data.AssetName.map((d, index) => {
        if (data.toObject().AssetName[index] != null) {
          if (pData[data.toObject().AssetName[index]]) {
            pData[data.toObject().AssetName[index]]["AssetsName"].push(
              data.toObject().AssetName[index]
            );
            pData[data.toObject().AssetName[index]]["Dates"].push(
              data.toObject().Date
            );
            pData[data.toObject().AssetName[index]]["AssetsValue"].push(
              data.toObject().Value[index]
            );
            pData[data.toObject().AssetName[index]]["Depreciation"].push(
              data.toObject().Depreciation[index]
            );
            pData[data.toObject().AssetName[index]]["AssetsFSM"].push(
              data.toObject().AssetsFSM[index]
            );
          } else {
            pData[data.toObject().AssetName[index]] = {
              AssetsName: [data.toObject().AssetName[index]],
              Dates: [data.toObject().Date],
              AssetsValue: [data.toObject().Value[index]],
              Depreciation: [data.toObject().Depreciation[index]],
              AssetsFSM: [data.toObject().AssetsFSM[index]],
            };
          }
        }
      });
    });
    pData = Object.values(pData);
    pData.map((data, i) => {
      const IsUsingStraightLine = data["AssetsFSM"].includes(
        data["AssetsName"][0]
      );
      var depRate = (data["Depreciation"][0] * 100) / data["AssetsValue"][0];
      data["Salvage"] = [data["AssetsValue"][0] - data["Depreciation"][0]];

      data["AssetsValue"].map((d, index) => {
        if (index < data["AssetsValue"].length - 1) {
          data["AssetsValue"][index + 1] =
            data["AssetsValue"][index] - data["Depreciation"][index];
          //Checking Method of Depreciations
          if (IsUsingStraightLine) {
            // For StraightLine Method
            data["Depreciation"][index + 1] =
              (data["AssetsValue"][0] * depRate) / 100;
          } else {
            // For Reducing Balance Method
            data["Depreciation"][index + 1] =
              (data["AssetsValue"][index + 1] * depRate) / 100;
          }
          data["Salvage"][index + 1] =
            data["AssetsValue"][index + 1] - data["Depreciation"][index + 1];
        }
        AssetsName.push(data["AssetsName"][index]);
        Dates.push(data["Dates"][index]);
        AssetsValue.push(data["AssetsValue"][index]);
        Depreciation.push(data["Depreciation"][index]);
        Salvage.push(data["Salvage"][index]);
      });
    });
    return res.json({
      AssetsName: AssetsName,
      Dates: Dates,
      AssetsValue: AssetsValue,
      Depreciation: Depreciation,
    });
  });
});

// Route for extract new depreciation
app.post("/extdocdep", function (req, res) {
  File.find({
    CompanyName: req.body.CompanyName,
    Date: {
      $gte: new Date(req.body.SDate),
      $lt: new Date(req.body.EDate),
    },
  }).then((files) => {
    var pData = {};
    var AssetsName = [];
    var Dates = [];
    var AssetsValue = [];
    var Salvage = [];
    var Depreciation = [];

    console.log("I am in Generate Documented Depreciation Values");

    files.map((data) => {
      data.AssetName.map((d, index) => {
        if (data.toObject().AssetName[index] != null) {
          if (pData[data.toObject().AssetName[index]]) {
            pData[data.toObject().AssetName[index]]["AssetsName"].push(
              data.toObject().AssetName[index]
            );
            pData[data.toObject().AssetName[index]]["Dates"].push(
              data.toObject().Date
            );
            pData[data.toObject().AssetName[index]]["AssetsValue"].push(
              data.toObject().Value[index]
            );
            pData[data.toObject().AssetName[index]]["Depreciation"].push(
              data.toObject().Depreciation[index]
            );
          } else {
            pData[data.toObject().AssetName[index]] = {
              AssetsName: [data.toObject().AssetName[index]],
              Dates: [data.toObject().Date],
              AssetsValue: [data.toObject().Value[index]],
              Depreciation: [data.toObject().Depreciation[index]],
              AssetsFSM: [data.toObject().AssetsFSM[index]],
            };
          }
        }
      });
    });
    pData = Object.values(pData);
    pData.map((data, i) => {
      // var depRate = (data["Depreciation"][0] * 100) / data["AssetsValue"][0];
      data["Salvage"] = [data["AssetsValue"][0] - data["Depreciation"][0]];

      data["AssetsValue"].map((d, index) => {
        // if (index < data["AssetsValue"].length - 1) {
        //   data["AssetsValue"][index + 1] =
        //     data["AssetsValue"][index] - data["Depreciation"][index];
        //   data["Depreciation"][index + 1] =
        //     (data["AssetsValue"][index + 1] * depRate) / 100;
        //   data["Salvage"][index + 1] =
        //     data["AssetsValue"][index + 1] - data["Depreciation"][index + 1];
        // }
        AssetsName.push(data["AssetsName"][index]);
        Dates.push(data["Dates"][index]);
        AssetsValue.push(data["AssetsValue"][index]);
        Depreciation.push(data["Depreciation"][index]);
        Salvage.push(data["Salvage"][index]);
      });
    });
    return res.json({
      AssetsName: AssetsName,
      Dates: Dates,
      AssetsValue: AssetsValue,
      Depreciation: Depreciation,
    });
  });
});

// Route for extract new rates
app.post("/extnewrat", function (req, res) {
  File.find({
    CompanyName: req.body.CompanyName,
    UserID: req.body.UserID,

    Date: {
      $gte: new Date(req.body.SDate),
      $lt: new Date(req.body.EDate),
    },
  }).then((files) => {
    var pData = {};
    var AssetsName = [];
    var Dates = [];
    var AssetsValue = [];
    var Salvage = [];
    var Depreciation = [];
    var Rates = [];

    console.log("I am in Generate  New Documented Rates");

    files.map((data) => {
      data.AssetName.map((d, index) => {
        if (data.toObject().AssetName[index] != null) {
          if (pData[data.toObject().AssetName[index]]) {
            pData[data.toObject().AssetName[index]]["AssetsName"].push(
              data.toObject().AssetName[index]
            );
            pData[data.toObject().AssetName[index]]["Dates"].push(
              data.toObject().Date
            );
            pData[data.toObject().AssetName[index]]["AssetsValue"].push(
              data.toObject().Value[index]
            );
            pData[data.toObject().AssetName[index]]["Depreciation"].push(
              data.toObject().Depreciation[index]
            );
            pData[data.toObject().AssetName[index]]["AssetsFSM"].push(
              data.toObject().AssetsFSM[index]
            );
          } else {
            pData[data.toObject().AssetName[index]] = {
              AssetsName: [data.toObject().AssetName[index]],
              Dates: [data.toObject().Date],
              AssetsValue: [data.toObject().Value[index]],
              Depreciation: [data.toObject().Depreciation[index]],
              AssetsFSM: [data.toObject().AssetsFSM[index]],
            };
          }
        }
      });
    });
    pData = Object.values(pData);
    pData.map((data, i) => {
      const IsUsingStraightLine = data["AssetsFSM"].includes(
        data["AssetsName"][0]
      );
      var depRate = (data["Depreciation"][0] * 100) / data["AssetsValue"][0];
      data["Salvage"] = [data["AssetsValue"][0] - data["Depreciation"][0]];

      data["AssetsValue"].map((d, index) => {
        if (index < data["AssetsValue"].length - 1) {
          data["AssetsValue"][index + 1] =
            data["AssetsValue"][index] - data["Depreciation"][index];
          //Checking Method of Depreciations
          if (IsUsingStraightLine) {
            // For StraightLine Method
            data["Depreciation"][index + 1] =
              (data["AssetsValue"][0] * depRate) / 100;
          } else {
            // For Reducing Balance Method
            data["Depreciation"][index + 1] =
              (data["AssetsValue"][index + 1] * depRate) / 100;
          }
          data["Salvage"][index + 1] =
            data["AssetsValue"][index + 1] - data["Depreciation"][index + 1];
        }
        AssetsName.push(data["AssetsName"][index]);
        Dates.push(data["Dates"][index]);
        AssetsValue.push(data["AssetsValue"][index]);
        Depreciation.push(data["Depreciation"][index]);
        Salvage.push(data["Salvage"][index]);
        Rates.push(depRate);
      });
    });
    return res.json({
      AssetsName: AssetsName,
      Dates: Dates,
      AssetsValue: AssetsValue,
      Rates: Rates,
    });
  });
});

// Route for extracte new rates
app.post("/extdocrat", function (req, res) {
  File.find({
    CompanyName: req.body.CompanyName,
    UserID: req.body.UserID,

    Date: {
      $gte: new Date(req.body.SDate),
      $lt: new Date(req.body.EDate),
    },
  }).then((files) => {
    var pData = {};
    var AssetsName = [];
    var Dates = [];
    var AssetsValue = [];
    var Salvage = [];
    var Depreciation = [];
    var Rates = [];

    console.log("I am in Generate Documented Rates");

    files.map((data) => {
      data.AssetName.map((d, index) => {
        if (data.toObject().AssetName[index] != null) {
          if (pData[data.toObject().AssetName[index]]) {
            pData[data.toObject().AssetName[index]]["AssetsName"].push(
              data.toObject().AssetName[index]
            );
            pData[data.toObject().AssetName[index]]["Dates"].push(
              data.toObject().Date
            );
            pData[data.toObject().AssetName[index]]["AssetsValue"].push(
              data.toObject().Value[index]
            );
            pData[data.toObject().AssetName[index]]["Depreciation"].push(
              data.toObject().Depreciation[index]
            );
            pData[data.toObject().AssetName[index]]["AssetsFSM"].push(
              data.toObject().AssetsFSM[index]
            );
          } else {
            pData[data.toObject().AssetName[index]] = {
              AssetsName: [data.toObject().AssetName[index]],
              Dates: [data.toObject().Date],
              AssetsValue: [data.toObject().Value[index]],
              Depreciation: [data.toObject().Depreciation[index]],
              AssetsFSM: [data.toObject().AssetsFSM[index]],
            };
          }
        }
      });
    });
    pData = Object.values(pData);
    pData.map((data, i) => {
      var depRate = (data["Depreciation"][0] * 100) / data["AssetsValue"][0];
      data["Salvage"] = [data["AssetsValue"][0] - data["Depreciation"][0]];

      data["AssetsValue"].map((d, index) => {
        // if (index < data["AssetsValue"].length - 1) {
        //   data["AssetsValue"][index + 1] =
        //     data["AssetsValue"][index] - data["Depreciation"][index];
        //   data["Depreciation"][index + 1] =
        //     (data["AssetsValue"][index + 1] * depRate) / 100;
        //   data["Salvage"][index + 1] =
        //     data["AssetsValue"][index + 1] - data["Depreciation"][index + 1];
        // }
        AssetsName.push(data["AssetsName"][index]);
        Dates.push(data["Dates"][index]);
        AssetsValue.push(data["AssetsValue"][index]);
        Depreciation.push(data["Depreciation"][index]);
        Salvage.push(data["Salvage"][index]);
        Rates.push(depRate);
      });
    });
    return res.json({
      AssetsName: AssetsName,
      Dates: Dates,
      AssetsValue: AssetsValue,
      Rates: Rates,
    });
  });
});

// Generate documented salvage values
app.post("/extdocsal", function (req, res) {
  File.find({
    CompanyName: req.body.CompanyName,
    UserID: req.body.UserID,

    Date: {
      $gte: new Date(req.body.SDate),
      $lt: new Date(req.body.EDate),
    },
  }).then((files) => {
    var pData = {};
    var AssetsName = [];
    var Dates = [];
    var AssetsValue = [];
    var Salvage = [];
    var Depreciation = [];

    console.log("I am in Generate Documented Salvage Values");

    files.map((data) => {
      data.AssetName.map((d, index) => {
        if (data.toObject().AssetName[index] != null) {
          if (pData[data.toObject().AssetName[index]]) {
            pData[data.toObject().AssetName[index]]["AssetsName"].push(
              data.toObject().AssetName[index]
            );
            pData[data.toObject().AssetName[index]]["Dates"].push(
              data.toObject().Date
            );
            pData[data.toObject().AssetName[index]]["AssetsValue"].push(
              data.toObject().Value[index]
            );
            pData[data.toObject().AssetName[index]]["Depreciation"].push(
              data.toObject().Depreciation[index]
            );
            pData[data.toObject().AssetName[index]]["AssetsFSM"].push(
              data.toObject().AssetsFSM[index]
            );
          } else {
            pData[data.toObject().AssetName[index]] = {
              AssetsName: [data.toObject().AssetName[index]],
              Dates: [data.toObject().Date],
              AssetsValue: [data.toObject().Value[index]],
              Depreciation: [data.toObject().Depreciation[index]],
              AssetsFSM: [data.toObject().AssetsFSM[index]],
            };
          }
        }
      });
    });
    pData = Object.values(pData);
    pData.map((data, i) => {
      // var depRate = (data["Depreciation"][0] * 100) / data["AssetsValue"][0];
      data["Salvage"] = [data["AssetsValue"][0] - data["Depreciation"][0]];

      data["AssetsValue"].map((d, index) => {
        // if (index < data["AssetsValue"].length - 1) {
        //   data["AssetsValue"][index + 1] =
        //     data["AssetsValue"][index] - data["Depreciation"][index];
        //   data["Depreciation"][index + 1] =
        //     (data["AssetsValue"][index + 1] * depRate) / 100;
        //   data["Salvage"][index + 1] =
        //     data["AssetsValue"][index + 1] - data["Depreciation"][index + 1];
        // }
        AssetsName.push(data["AssetsName"][index]);
        Dates.push(data["Dates"][index]);
        AssetsValue.push(data["AssetsValue"][index]);
        Depreciation.push(data["Depreciation"][index]);
        Salvage.push(data["Salvage"][index]);
      });
    });
    return res.json({
      AssetsName: AssetsName,
      Dates: Dates,
      AssetsValue: AssetsValue,
      Salvage: Salvage,
    });
  });
});

// Route for generate new salvage
app.post("/extnewsal", function (req, res) {
  File.find({
    CompanyName: req.body.CompanyName,
    UserID: req.body.UserID,

    Date: {
      $gte: new Date(req.body.SDate),
      $lt: new Date(req.body.EDate),
    },
  }).then((files) => {
    var pData = {};
    var AssetsName = [];
    var Dates = [];
    var AssetsValue = [];
    var Salvage = [];
    var Depreciation = [];

    console.log("I am in Generate New Salvage Values");

    files.map((data) => {
      data.AssetName.map((d, index) => {
        if (data.toObject().AssetName[index] != null) {
          if (pData[data.toObject().AssetName[index]]) {
            pData[data.toObject().AssetName[index]]["AssetsName"].push(
              data.toObject().AssetName[index]
            );
            pData[data.toObject().AssetName[index]]["Dates"].push(
              data.toObject().Date
            );
            pData[data.toObject().AssetName[index]]["AssetsValue"].push(
              data.toObject().Value[index]
            );
            pData[data.toObject().AssetName[index]]["Depreciation"].push(
              data.toObject().Depreciation[index]
            );
            pData[data.toObject().AssetName[index]]["AssetsFSM"].push(
              data.toObject().AssetsFSM[index]
            );
          } else {
            pData[data.toObject().AssetName[index]] = {
              AssetsName: [data.toObject().AssetName[index]],
              Dates: [data.toObject().Date],
              AssetsValue: [data.toObject().Value[index]],
              Depreciation: [data.toObject().Depreciation[index]],
              AssetsFSM: [data.toObject().AssetsFSM[index]],
            };
          }
        }
      });
    });
    pData = Object.values(pData);
    pData.map((data, i) => {
      var depRate = (data["Depreciation"][0] * 100) / data["AssetsValue"][0];
      data["Salvage"] = [data["AssetsValue"][0] - data["Depreciation"][0]];
      data["AssetsValue"].map((d, index) => {
        const IsUsingStraightLine = data["AssetsFSM"].includes(
          data["AssetsName"][0]
        );
        if (index < data["AssetsValue"].length - 1) {
          data["AssetsValue"][index + 1] =
            data["AssetsValue"][index] - data["Depreciation"][index];

          //Checking Method of Depreciations
          if (IsUsingStraightLine) {
            // For StraightLine Method
            data["Depreciation"][index + 1] =
              (data["AssetsValue"][0] * depRate) / 100;
          } else {
            // For Reducing Balance Method
            data["Depreciation"][index + 1] =
              (data["AssetsValue"][index + 1] * depRate) / 100;
          }

          data["Salvage"][index + 1] =
            data["AssetsValue"][index + 1] - data["Depreciation"][index + 1];
        }
        AssetsName.push(data["AssetsName"][index]);
        Dates.push(data["Dates"][index]);
        AssetsValue.push(data["AssetsValue"][index]);
        Depreciation.push(data["Depreciation"][index]);
        Salvage.push(data["Salvage"][index]);
      });
    });
    return res.json({
      AssetsName: AssetsName,
      Dates: Dates,
      AssetsValue: AssetsValue,
      Salvage: Salvage,
    });
  });
});

// Route for generate depreciation comparison report
app.post("/extdepcom", function (req, res) {
  File.find({
    CompanyName: req.body.CompanyName,
    UserID: req.body.UserID,
    Date: {
      $gte: new Date(req.body.SDate),
      $lt: new Date(req.body.EDate),
    },
  }).then((files) => {
    var pData = {};
    var p2Data = {};
    var AssetsName = [];
    var Dates = [];
    var AssetsValue = [];
    var Salvage = [];
    var Depreciation = [];
    var CAssetsValue = [];
    var CDepreciation = [];
    files.map((data) => {
      data.AssetName.map((d, index) => {
        if (data.toObject().AssetName[index] != null) {
          console.log("Here");
          if (pData[data.toObject().AssetName[index]]) {
            pData[data.toObject().AssetName[index]]["AssetsName"].push(
              data.toObject().AssetName[index]
            );
            pData[data.toObject().AssetName[index]]["Dates"].push(
              data.toObject().Date
            );
            pData[data.toObject().AssetName[index]]["AssetsValue"].push(
              data.toObject().Value[index]
            );
            pData[data.toObject().AssetName[index]]["Depreciation"].push(
              data.toObject().Depreciation[index]
            );
            pData[data.toObject().AssetName[index]]["AssetsFSM"].push(
              data.toObject().AssetsFSM[index]
            );
          } else {
            pData[data.toObject().AssetName[index]] = {
              AssetsName: [data.toObject().AssetName[index]],
              Dates: [data.toObject().Date],
              AssetsValue: [data.toObject().Value[index]],
              Depreciation: [data.toObject().Depreciation[index]],
              AssetsFSM: [data.toObject().AssetsFSM[index]],
            };
          }
        }
      });
    });
    pData = Object.values(pData);
    p2Data = Object.values(pData);
    pData.map((data, i) => {
      var depRate = (data["Depreciation"][0] * 100) / data["AssetsValue"][0];
      data["Salvage"] = [data["AssetsValue"][0] - data["Depreciation"][0]];
      AssetsValue.push(data["AssetsValue"][0]);
      Depreciation.push(data["Depreciation"][0]);
      Salvage.push(data["Salvage"][0]);
      CAssetsValue.push(data["AssetsValue"][0]);
      CDepreciation.push(data["Depreciation"][0]);
      const IsUsingStraightLine = data["AssetsFSM"].includes(
        data["AssetsName"][0]
      );
      data["AssetsValue"].map((d, index) => {
        console.log(index);
        AssetsName.push(data["AssetsName"][index]);
        Dates.push(
          data["Dates"][index].getDate() +
            "-" +
            data["Dates"][index].getMonth() +
            "-" +
            data["Dates"][index].getFullYear()
        );
        console.log("Before");
        if (index < data["AssetsValue"].length - 1) {
          // Before Computation
          AssetsValue.push(data["AssetsValue"][index + 1]);
          Depreciation.push(data["Depreciation"][index + 1]);
          //Computation
          data["AssetsValue"][index + 1] =
            data["AssetsValue"][index] - data["Depreciation"][index];

          //Checking Method of Depreciations
          if (IsUsingStraightLine) {
            // For StraightLine Method
            data["Depreciation"][index + 1] =
              (data["AssetsValue"][0] * depRate) / 100;
          } else {
            // For Reducing Balance Method
            data["Depreciation"][index + 1] =
              (data["AssetsValue"][index + 1] * depRate) / 100;
          }

          //After Computation
          CAssetsValue.push(data["AssetsValue"][index + 1]);
          CDepreciation.push(data["Depreciation"][index + 1]);
        }
      });
    });
    return res.json({
      AssetsName: AssetsName,
      Dates: Dates,
      Documented_Value: AssetsValue,
      Computed_Value: CAssetsValue,
      Documented_Depreciation: Depreciation,
      Computed_Depreciation: CDepreciation,
    });
  });
});

// Route for adding new file
app.post("/addfile", (req, res) => {
  File.findOne({ FileName: req.body.FileName }).then((file) => {
    if (file) {
      return res.status(400).json({ ID: "File already exits." });
    } else {
      const newFile = new File({
        UserID: req.body.UserID,
        CompanyName: req.body.CompanyName,
        Date: req.body.Date,
        OptionalDetails: req.body.OptionalDetails,
        NegligibleRates: req.body.NegligibleRates,
        DepreciationRates: req.body.DepreciationRates,
        FileName: req.body.FileName,
        FileID: req.body.FileID,
        AssetName: req.body.FileData[0],
        Value: req.body.FileData[1],
        Depreciation: req.body.FileData[2],
        NetValue: req.body.FileData[3],
        AssetsFSM: req.body.AssetsForStraighLine,
      });
      newFile
        .save()
        .then((User) => res.json(User))
        .catch((err) => console.log(err));
    }
  });
});

// importing route
const User = require("./routes/user");
app.use("/", User);

// For Heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    console.log(__filename);
    res.sendFile(path.resolve(__dirname + "/client/build/index.html")); // relative path
  });
}

// Running Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
