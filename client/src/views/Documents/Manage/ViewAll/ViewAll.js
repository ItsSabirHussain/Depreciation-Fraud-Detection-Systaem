import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import axios from "axios";

class ViewAll extends Component {
  constructor(props) {
    super(props);
    this.renderFiles = this.renderFiles.bind(this);
    this.state = {
      companyName: "",
      data: Date,
      files: [],
    };
  }
  convertDate(date) {
    return date.toString().substring(0, 10);
  }
  renderFiles() {
    const url = "/getallfiles";
    axios.post(url, { UserID: localStorage.getItem("userID") }).then((res) => {
      this.setState({ files: res.data });
    });
    return this.state.files.map((file, index) => {
      return (
        <tr key={file.id}>
          <td>{index + 1}</td>
          <td>{file.CompanyName}</td>
          <td>{this.convertDate(file.Date)}</td>
          <td>
            <Link to={"/file/" + file.FileName} target="_blank" download>
              <Badge color="success">Download</Badge>
            </Link>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> All Uploaded Documents
                Listed Below
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>No#</th>
                      <th>Document Name</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderFiles()}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ViewAll;
