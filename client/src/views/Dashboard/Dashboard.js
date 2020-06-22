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
      name: this.props.data.Name,
      email: this.props.data.Email,
      password: this.props.data.Password,
      designation: this.props.data.Designation,
    };
  }
  updateUser() {
    console.log(this.state);
    axios
      .post("/userupdate", {
        id: localStorage.getItem("userID"),
        Name: this.state.name,
        Email: this.state.email,
        Password: this.state.password,
        Designation: this.state.designation,
      })
      .then((res) => {
        this.props.history.push("/dashboard");
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
                        type="text"
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
