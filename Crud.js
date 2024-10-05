import React, { useEffect, useState } from "react";
import "../App.css";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import axios from "axios";

function Crud() {
  const [All, setAll] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    AllData();
  }, []);

  const AllData = () => {
    axios
      .get(`http://localhost:4000/emp`)
      .then((res) => {
        setAll(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const handleSubmit = () => {
    let postData = {
      name: name,
      age: age,
      ph: phone,
    };
    axios
      .post(`http://localhost:4000/emp`, postData)
      .then((res) => {
        console.log(res.data);
        AllData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/emp/${id}`)
      .then((res) => {
        console.log(res);
        AllData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    let putData = {
      name: name,
      age: age,
      ph: phone,
    };

    axios
      .put(`http://localhost:4000/emp/${id}`, putData) // Using the state for id
      .then((res) => {
        console.log(res.data);
        AllData(); // Call your function to refresh data or perform other actions
        setId("");
        setName("");
        setAge("");
        setPhone("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <div className="d-flex justify-content-center p-5 ">
        <Card className="bg-light">
          <Form className="p-5" onSubmit={handleSubmit}>
            <h5>Create Form</h5>

            <Row>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Row>
            <Row>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setAge(e.target.value)}
              />
            </Row>
            <Row>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Row>
            <Row className="mt-3">
              <Button size="sm" type="submit">
                Submit
              </Button>
            </Row>
          </Form>
        </Card>
        <Card className="bg-light mx-5">
          <Form className="p-5" onSubmit={handleUpdate}>
            <h5>Update Form</h5>
            <Row>
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setId(e.target.value)}
              />
            </Row>
            <Row>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Row>
            <Row>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setAge(e.target.value)}
              />
            </Row>
            <Row>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Row>
            <Row className="mt-3">
              <Col>
                <Button className="bg-warning border-0" size="sm" type="submit">
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
      <div className="p-5">
        <Table bordered hover striped>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {All?.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.ph}</td>

                <td>
                  <Button
                    className="bg-danger border-0"
                    size="sm"
                    type="submit"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Crud;
