import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      designation: "",
    };
  }
  onSubmit() {
    console.log(this.state);
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.name == "") {
      alert("Name field can't be empty.");
    }
    if (this.state.email == "") {
      alert("Email field can't be empty.");
    } else {
      if (!re.test(this.state.email)) {
        alert("Please enter a valid email.");
      }
    }
    if (this.state.designation == "") {
      alert("Designation field can't be empty.");
    }
    if (this.state.password == "") {
      alert("Password field can't be empty.");
    }
    axios
      .post("/userreg", {
        Name: this.state.name,
        Designation: this.state.designation,
        Email: this.state.email,
        Password: this.state.password,
      })
      .then((res) => {
        console.log(res.data);
        this.props.history.push("/login");
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.onSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Name"
                        autoComplete="name"
                        onChange={(e) => {
                          this.setState({
                            ...this.state,
                            name: e.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(e) => {
                          this.setState({
                            ...this.state,
                            email: e.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Designation"
                        autoComplete="designations"
                        onChange={(e) => {
                          this.setState({
                            ...this.state,
                            designation: e.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="password"
                        onChange={(e) => {
                          this.setState({
                            ...this.state,
                            password: e.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                    <Button type="submit" color="success" block>
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
