import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class ViewAll extends Component {
  
  render() {
    return (
      <div className="animated fadeIn">
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
                    <td>9</td>
                    <td>Royle Tag Pakistan</td>
                    <td>31/12/2012</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>Google Inc USA</td>
                    <td>31/12/2015</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>Pasban IT Group Pakistan</td>
                    <td>31/12/2013</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>Sitara Group Pakistan</td>
                    <td>31/12/2015</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>Lamborghini Italy</td>
                    <td>31/12/2012</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>13</td>
                    <td>RoyleTag</td>
                    <td>2012/01/01</td>
                    <td>
                      <Badge color="success">Download</Badge>{' '}
                      <Badge color="warning">View</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>14</td>
                    <td>Standard Chartered Bank Pakistan</td>
                    <td>31/12/2018</td>
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

export default ViewAll;
