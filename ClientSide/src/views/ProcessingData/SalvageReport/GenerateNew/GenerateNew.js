import React, { Component } from 'react';
import { 
  Badge, 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Row, 
  Pagination, 
  PaginationItem, 
  PaginationLink, 
  Table, 
  Button,
  CardFooter,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
class GenerateNew extends Component {
  
  render() {
    return (
      <div className="animated fadeIn">
         <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Generate Report of New Salvage Values : </strong> (according to extracted or provided rates) 
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
                      <Label htmlFor="date-input">Date  <Badge>Start Financial Period</Badge></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="date-input" name="date-input" placeholder="date" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">Date  <Badge>End Financial Period</Badge></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="date-input" name="date-input" placeholder="date" />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>        
              <CardFooter>
                <Button type="submit" size="xl" color="primary"><i className="fa fa-dot-circle-o"></i> Extract</Button>{' '}
                <Button type="reset" size="xl" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> <strong>Report of New Salvage Values: </strong>(according to extracted or provided rates) 
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>No#</th>
                    <th>Asset's Name</th>
                    <th>Date</th>
                    <th>Asset's Value $</th>
                    <th>Salvage's Value $</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>1</td>
                    <td>Perosnal Computers</td>
                    <td>12/31/2013</td>
                    <td>105000</td>
                    <td>15000</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Perosnal Computers</td>
                    <td>12/31/2014</td>
                    <td>95000</td>
                    <td>15000</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Perosnal Computers</td>
                    <td>12/31/2015</td>
                    <td>80000</td>
                    <td>15000</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Perosnal Computers</td>
                    <td>12/31/2016</td>
                    <td>65000</td>
                    <td>15000</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Furniture</td>
                    <td>12/31/2013</td>
                    <td>200000</td>
                    <td>20000</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Furniture</td>
                    <td>12/31/2014</td>
                    <td>180000</td>
                    <td>20000</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>Furniture</td>
                    <td>12/31/2015</td>
                    <td>160000</td>
                    <td>20000</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>Furniture</td>
                    <td>12/31/2016</td>
                    <td>140000</td>
                    <td>20000</td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>Machinary</td>
                    <td>12/31/2013</td>
                    <td>1000000</td>
                    <td>100000</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>Machinary</td>
                    <td>12/31/2014</td>
                    <td>900000</td>
                    <td>100000</td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>Machinary</td>
                    <td>12/31/2015</td>
                    <td>800000</td>
                    <td>100000</td>
                  </tr>
                
                </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="xl" color="primary"><i className="fa fa-dot-circle-o"></i> Save</Button>{' '}
                <Button type="submit" size="xl" color="danger"><i className="fa fa-dot-circle-o"></i> Print</Button>{' '}
              </CardFooter>
            </Card>
          </Col>
        </Row>
 
     </div>

    );
  }
}

export default GenerateNew;
