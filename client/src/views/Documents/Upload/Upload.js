import React, { Component } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import XLSX from "xlsx";
import { array } from "prop-types";

class Upload extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      CompanyName: "",
      Date: Date,
      OptionalDetails: "",
      DepreciationRates: "",
      NegligibleRates: "",
      AssetsForStraighLine: [],
      File: { name: null },
      Files: [],
      JData: [],
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.fileUpload(this.state.file);
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
    var f = e.target.files[0];
    var reader = new FileReader();
    var AssetsName = new Array();
    var Value = new Array();
    var Depreciation = new Array();
    var NetValue = new Array();

    reader.onload = function(e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });

      dataParse.forEach((data, index) => {
        if (!index == 0) {
          AssetsName[index - 1] = data[0];
          Value[index - 1] = data[2];
          Depreciation[index - 1] = data[3];
          NetValue[index - 1] = data[4];
        }
      });
    };
    reader.readAsBinaryString(f);
    this.state.JData[0] = [AssetsName, Value, Depreciation, NetValue];
    console.log(this.state.JData[0]);
  }

  fileUpload(file) {
    console.log(this.state.JData[0]);
    const url = "http://localhost:5000/upload";
    const formData = new FormData();
    file["date"] = Date();
    formData.append("file", file);
    axios.post(url, formData).then(res => {
      console.log(this.state);
      const tmpFileData = {
        CompanyName: this.state.CompanyName,
        Date: this.state.Date,
        OptionalDetails: this.state.OptionalDetails,
        NegligibleRates: this.state.NegligibleRates,
        DepreciationRates: this.state.DepreciationRates,
        AssetsForStraighLine: this.state.AssetsForStraighLine,
        FileName: res.data.file.filename,
        FileID: res.data.file.id,
        File: this.state.file,
        FileData: this.state.JData[0]
      };
      console.log(tmpFileData);
      axios
        .post("http://localhost:5000/addfile", tmpFileData)
        .then(res => {
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    });
    // fetch(url, );
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Upload Document : </strong> Enter information and choose
                files
              </CardHeader>
              <CardBody>
                <Form
                  action=""
                  method="post"
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Document Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="text-input"
                        name="text-input"
                        placeholder="Text"
                        onChange={e => {
                          this.setState({
                            ...this.state,
                            CompanyName: e.target.value
                          });
                        }}
                      />
                      <FormText color="muted">
                        Write the exact name of Document if you have already
                        Upload document with this name but different year.
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">
                        Date <Badge>Financial Period</Badge>
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="date"
                        id="date-input"
                        name="date-input"
                        placeholder="date"
                        onChange={e => {
                          this.setState({
                            ...this.state,
                            Date: e.target.value
                          });
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Optional Details</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="textarea"
                        name="textarea-input"
                        id="textarea-input"
                        rows="9"
                        placeholder="Details..."
                        onChange={e => {
                          this.setState({
                            ...this.state,
                            OptionalDetails: e.target.value
                          });
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">
                        Depreciation Method <Badge>If any</Badge>
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="text-input"
                        name="text-input"
                        placeholder="Asset_Name1, Asset_Name2, ... , Asset_NameN "
                        onChange={e => {
                          this.setState({
                            ...this.state,
                            AssetsForStraighLine: e.target.value.split(",")
                          });
                        }}
                      />
                      <FormText color="muted">
                        System is condidering reducing balance method by defaul
                        for all asset if for calculation of any asset is using
                        straight line method please write exact name of asset.
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-multiple-input">Choose Files</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <section className="section">
                        <div className="file is-info has-name is-fullwidth">
                          <label className="file-label">
                            <input
                              className="file-input"
                              type="file"
                              name="resume"
                              onChange={this.onChange}
                            />
                            <span className="file-name"></span>
                          </label>
                        </div>
                        <div className="container is-fluid"></div>
                      </section>
                    </Col>
                  </FormGroup>
                  <FormGroup row hidden>
                    <Col md="3">
                      <Label
                        className="custom-file"
                        htmlFor="custom-file-input"
                      >
                        Custom file input
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Label className="custom-file"></Label>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <CardFooter>
                <Button
                  type="submit"
                  size="xl"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  <i className="fa fa-dot-circle-o"></i> Submit
                </Button>
                <Button type="reset" size="xl" color="danger">
                  <i className="fa fa-ban"></i> Reset
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Upload;
