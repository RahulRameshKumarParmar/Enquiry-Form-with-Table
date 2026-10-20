import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

function App() {
  let [formData, setFormData] = useState({
    uName: '',
    uEmail: '',
    uPhone: '',
    uMessage: '',
    index: ''
  });

  let [userData, setUserData] = useState([]);

  let getValue = (event) => {
    let oldData = { ...formData };
    oldData[event.target.name] = event.target.value;
    setFormData(oldData);
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    let currentUserFormData = {
      uName: formData.uName,
      uEmail: formData.uEmail,
      uPhone: formData.uPhone,
      uMessage: formData.uMessage
    };

    if (formData.index === "") {
      let checkFilterUser = userData.filter((v) => v.uEmail === formData.uEmail || v.uPhone === formData.uPhone);

      if (checkFilterUser.length === 1) {
        alert("Email or Phone Number Already Exists");
      } else {
        let oldUserData = [...userData, currentUserFormData];
        setUserData(oldUserData);
        setFormData({
          uName: '',
          uEmail: '',
          uPhone: '',
          uMessage: '',
          index: ''
        });
      }
    } else {
      let editIndex = formData.index;
      let checkFilterUser = userData.filter((v, i) =>
        (v.uEmail === formData.uEmail || v.uPhone === formData.uPhone) && i !== Number(editIndex)
      );

      if (checkFilterUser.length === 0) {
        let oldData = [...userData];
        oldData[editIndex] = currentUserFormData;
        setUserData(oldData);
        setFormData({
          uName: '',
          uEmail: '',
          uPhone: '',
          uMessage: '',
          index: ''
        });
      } else {
        alert("Email or Phone Number Already Exists");
      }
    }
  };

  let deleteRow = (index) => {
    let filterDataAfterDelete = userData.filter((v, i) => i !== index);
    setUserData(filterDataAfterDelete);
  };

  let editRow = (index) => {
    let editData = { ...userData[index], index: index };
    setFormData(editData);
  };

  return (
    <div className="App">
      <Container fluid>
        <Container>
          <Row>
            <Col className="text-center py-5">
              <h1>Enquiry Now!</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={5}>
              <p>Total Entries: {userData.length}</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="pb-3 text-start">
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="uName"
                    value={formData.uName}
                    onChange={getValue}
                  />
                </Form.Group>

                <Form.Group className="pb-3 text-start">
                  <Form.Label htmlFor='email'>Email</Form.Label>
                  <Form.Control
                    type="email"
                    id='email'
                    name="uEmail"
                    value={formData.uEmail}
                    onChange={getValue}
                  />
                </Form.Group>

                <Form.Group className="pb-3 text-start">
                  <Form.Label htmlFor='phone'>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    id='phone'
                    name="uPhone"
                    value={formData.uPhone}
                    onChange={getValue}
                  />
                </Form.Group>

                <Form.Group className="pb-3 text-start">
                  <Form.Label htmlFor='textarea'>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    id='textarea'
                    rows={3}
                    name="uMessage"
                    value={formData.uMessage}
                    onChange={getValue}
                  />
                </Form.Group>

                <div className="pb-3 text-start">
                  <Button type="submit" variant="primary">
                    {formData.index !== "" ? "Update" : "Save"}
                  </Button>
                </div>
              </Form>
            </Col>
            <Col lg={7}>
              <Table striped bordered hover>
                <thead>
                  <tr className='text-center'>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.length >= 1 ?
                    userData.map((obj, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{obj.uName}</td>
                          <td>{obj.uEmail}</td>
                          <td>{obj.uPhone}</td>
                          <td>{obj.uMessage}</td>
                          <td>
                            <button onClick={() => deleteRow(index)}>Delete</button>
                            <button onClick={() => editRow(index)}>Update</button>
                          </td>
                        </tr>
                      )
                    })
                    :
                    <tr className='text-center'>
                      <td colSpan={6}>No Data Found</td>
                    </tr>
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default App;
