import React, { Component } from "react";
import TableViewer from "react-js-table-with-csv-dl";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import {
  Button,
  CardFooter,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";
import axios from "axios";
class ViewSpecific extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      CompanyName: "",
      date: Date,
      TableBady: [],
      TableHeaders: ["AssetName", "Value", "Depreciation", "NetValue"],
    };
  }
  onClick() {
    console.log(this.state.CompanyName);
    console.log(this.state.date);

    const url = "/getfiledata";
    axios
      .post(url, {
        UserID: localStorage.getItem("userID"),
        CompanyName: this.state.CompanyName,
        date: this.state.date,
      })
      .then((res) => {
        let tmpArr = [];
        res.data.AssetName.map((data, index) => {
          if (!data == "") {
            tmpArr[index] = {
              AssetName: data,
              Value: res.data.Value[index],
              Depreciation: res.data.Depreciation[index],
              NetValue: res.data.NetValue[index],
            };
          }
        });

        this.setState({ TableBady: tmpArr });
      });
  }
  renderData() {
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
                <strong>Check Specific Document : </strong> Enter information
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
                        Date <Badge>Financial Period</Badge>
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
                            date: e.target.value,
                          });
                        }}
                      />
                      <FormText color="muted">
                        If date is not provided then all Documents with this
                        name will be appeared.
                      </FormText>
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
                  <i className="fa fa-dot-circle-o"></i> Submit
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> All Uploaded Documents
                Listed Below
              </CardHeader>
              <CardBody>{this.renderData()}</CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ViewSpecific;
