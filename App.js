import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [fulldata, setFulldata] = useState([]);
  const [sio, setio] = useState(null);
  const [sio2, setio2] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/students")
      .then((res) => setFulldata(res.data))
      .catch((err) => console.log(err));
  }, []);

  //delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/students/${id}`)
      .then((res) => {
        alert("success");
      })
      .catch((err) => console.log(err));

    // Implement delete logic here
    console.log("Deleting student with ID:", id);
  };

  //get 1 user
  const handledata = () => {
    axios
      .get(`http://localhost:4000/api/students/${sio}`)
      .then((res) => {
        setio2(res.data);
        alert("success");
      })
      .catch((err) => console.log(err));
  };

  //update
  console.log(sio2);
  const handleUpdate = (id) => {
    let patchdata = {
      mark: 500,
    };
    axios
      .patch(`http://localhost:4000/api/students/${id}`, patchdata)
      .then((res) => {
        console.log(res.data);
        alert("success");
      })
      .catch((err) => {
        console.log(err);
        alert("faild");
      });
    // Implement update logic here
    console.log("Updating student with ID:", id);
  };

  //insert
  const cretedata = (e) => {
    e.preventDefault();
    let patchdata = {
      mark: 500,
      name: "spi",
      age: 23,
    };
    axios
      .post(`http://localhost:4000/api/students/`, patchdata)
      .then((res) => {
        console.log(res.data);
        alert("success");
      })
      .catch((err) => {
        console.log(err);
        alert("faild");
      });
    // Implement update logic here
    console.log("created student data:");
  };
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Mark</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fulldata?.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.mark}</td>
              <td>
                <button onClick={() => handleDelete(student._id)}>
                  Delete
                </button>
                <button onClick={() => handleUpdate(student._id)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={(e) => cretedata(e)}>create</button>

      <input
        type="text"
        placeholder="Enter"
        onChange={(e) => setio(e.target.value)}
      ></input>
      <button onClick={handledata}>submit</button>
      {sio2 && <label>{sio2}</label>}
    </div>
  );
}

export default App;
