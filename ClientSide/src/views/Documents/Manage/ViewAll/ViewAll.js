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
  Table
} from "reactstrap";
import axios from "axios";

class ViewAll extends Component {
  constructor(props) {
    super(props);
    this.renderFiles = this.renderFiles.bind(this);
    this.state = {
      companyName: "",
      data: Date,
      files: []
    };
  }
  renderFiles() {
    console.log("Here");
    const url = "http://localhost:5000/getallfiles";
    axios.post(url).then(res => {
      console.log(res.data);
      this.setState({ files: res.data });
    });
    return this.state.files.map((file, index) => {
      return (
        <tr key={file.id}>
          <td>{index + 1}</td>
          <td>{file.CompanyName}</td>
          <td>{file.Date}</td>
          <td>
            <a href={"http://localhost:5000/file/" + file.FileName}>
              <Badge color="success">Download</Badge>
            </a>
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
                <Pagination>
                  <PaginationItem disabled>
                    <PaginationLink previous tag="button">
                      Prev
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button">
                      Next
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ViewAll;
