import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Button,
} from "reactstrap";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }
  updateUser() {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const data = {
      id: localStorage.getItem("userID"),
      Name: this.state.name,
      Email: this.state.email,
      Designation: this.state.designation,
      Password: this.state.password,
    };

    if (!data.Designation) {
      data.Designation = this.props.data.Designation;
    }

    if (!data.Name) {
      data.Name = this.props.data.Name;
    }

    if (!data.Password) {
      data.Password = this.props.data.Password;
    }

    if (!data.Email) {
      data.Email = this.props.data.Email;
    } else {
      if (!re.test(data.Email)) {
        alert("Please enter a valid email.");
      }
    }
    axios
      .post("/userupdate", data)
      .then((res) => {
        alert("Information has beed updated successfulluy.");
      })
      .catch((error) => {
        alert(error);
      });
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>User Profile</CardHeader>
              <CardBody>
                <Row>
                  <Col md="6">
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Name</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder={this.props.data.Name}
                        autoComplete="name"
                        onChange={(e) => {
                          this.setState({
                            ...this.state,
                            name: e.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>{"Email"}</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        placeholder={this.props.data.Email}
                        autoComplete="email"
                        onChange={(e) => {
                          this.setState({
                            ...this.state,
                            email: e.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Designation</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder={this.props.data.Designation}
                        autoComplete="designation"
                        onChange={(e) => {
                          this.setState({
                            ...this.state,
                            designation: e.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Passowrd</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder={this.props.data.Password}
                        autoComplete="password"
                        onChange={(e) => {
                          this.setState({
                            ...this.state,
                            password: e.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <InputGroup className="mb-4s">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText></InputGroupText>
                      </InputGroupAddon>
                      <Button color="primary" onClick={this.updateUser}>
                        Update
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
