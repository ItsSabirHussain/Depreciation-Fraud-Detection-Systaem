import React, { Component } from "react";
import TableViewer from "react-js-table-with-csv-dl";
import axios from "axios";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button,
  CardFooter,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";
class Rates extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      CompanyName: "",
      DocumentedData: {},
      SDate: Date,
      EDate: Date,
      TableBady: [],
      TableHeaders: [
        "AssetName",
        "Date",
        "Documented_Value",
        "Computed_Value",
        "Value_Difference",
        "Documented_Rate",
        "Computed_Rate",
        "Rate_Difference",
      ],
    };
  }
  convertDate(date) {
    return date.toString().substring(0, 10);
  }
  onClick() {
    const url = "/extdepcom";
    axios
      .post(url, {
        CompanyName: this.state.CompanyName,
        SDate: this.state.SDate,
        EDate: this.state.EDate,
        UserID: localStorage.getItem("userID"),
      })
      .then((res) => {
        let tmpArr = [];
        res.data.AssetsName.map((data, index) => {
          tmpArr[index] = {
            AssetName: data,
            Date: this.convertDate(res.data.Dates[index]),
            Documented_Value: res.data.Documented_Value[index].toFixed(2),
            Computed_Value: res.data.Computed_Value[index].toFixed(2),
            Value_Difference: (
              res.data.Documented_Value[index] - res.data.Computed_Value[index]
            ).toFixed(2),

            Documented_Rate: (
              (res.data.Documented_Depreciation[index] * 100) /
              res.data.Documented_Value[index]
            ).toFixed(2),
            Computed_Rate: (
              (res.data.Computed_Depreciation[index] * 100) /
              res.data.Computed_Value[index]
            ).toFixed(2),
            Rate_Difference: (
              (res.data.Documented_Depreciation[index] * 100) /
                res.data.Documented_Value[index] -
              (res.data.Computed_Depreciation[index] * 100) /
                res.data.Computed_Value[index]
            ).toFixed(2),
          };
        });

        this.setState({ TableBady: tmpArr });
      });
  }
  renderData() {
    console.log(this.state.TableBady);
    return (
      <TableViewer
        content={this.state.TableBady}
        headers={this.state.TableHeaders}
        minHeight={0}
        maxHeight={50}
        activateDownloadButton={true}
        pagination={10}
        searchEnabled={true}
      />
    );
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Generate Comparison Report of Rates : </strong>{" "}
                (according to extracted or provided rates)
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
                      <Label htmlFor="text-input">Company's Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="text-input"
                        name="text-input"
                        placeholder="Company's Name"
                        onChange={(e) => {
                          this.setState({
                            ...this.state,
                            CompanyName: e.target.value,
                          });
                        }}
                      />
                      <FormText color="muted">
                        Write the exact name of Document.
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">
                        Date <Badge>Start Financial Period</Badge>
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="date"
                        id="date-input"
                        name="date-input"
                        placeholder="date"
                        onChange={(e) => {
                          this.setState({
                            ...this.state,
                            SDate: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">
                        Date <Badge>End Financial Period</Badge>
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="date"
                        id="date-input"
                        name="date-input"
                        placeholder="date"
                        onChange={(e) => {
                          this.setState({
                            ...this.state,
                            EDate: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  size="xl"
                  color="primary"
                  onClick={this.onClick}
                >
                  <i className="fa fa-dot-circle-o"></i> Extract
                </Button>{" "}
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>{" "}
                <strong>Comparison Report of Rates: </strong>(according to
                extracted or provided rates)
              </CardHeader>
              <CardBody>{this.renderData()}</CardBody>
              <CardFooter>
                <Button type="submit" size="xl" color="danger">
                  <i className="fa fa-dot-circle-o"></i> Print
                </Button>{" "}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Rates;
