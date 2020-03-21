import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {
  Button,
  CardFooter,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
class ViewSpecific extends Component {
  
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
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Document's Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="Name of Document" />
                      <FormText color="muted">Write the exact name of Document.</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Select Type</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Select Type
                    </button>
                    <FormText color="muted">It can be documented detail or computed details.</FormText>
                  </div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">Date  <Badge>Financial Period</Badge></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="date-input" name="date-input" placeholder="date" />
                      <FormText color="muted">If date is not provided then all Documents with this name will be appeared.</FormText>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>        
              <CardFooter>
                <Button type="submit" size="xl" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="xl" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
     
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> All Uploaded Documents Listed Below
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th >No#</th>
                    <th>Document Name</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>1</td>
                    <td>Royle Tag Pakistan</td>
                    <td>31/12/2013</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Charcaol Clothing Pakistan</td>
                    <td>31/12/2014</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Borjan Shoes Pakistan</td>
                    <td>31/12/2016</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>ACS Shoes Pakistan</td>
                    <td>31/12/2015</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Apple Inc USA</td>
                    <td>31/12/2013</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Amazon USA</td>
                    <td>31/12/2011</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>Google Inc USA</td>
                    <td>31/12/2017</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>Apple Inc USA</td>
                    <td>31/12/2018</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>Apple Inc USA</td>
                    <td>31/12/2017</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
           
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
</div>

    );
  }
}

export default ViewSpecific;
