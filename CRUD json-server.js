npx create-react-app client
npm i axios
npm start

client:

import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [updated, setUpdated] = useState({ id: "", name: "" });

  useEffect(() => {
    loadData();
  }, []);

  //Get
  const loadData = async () => {
    const response = await axios.get(`http://localhost:3003/users`);
    console.log(response.data);
    setUsers(response.data);
  };
  //ADD
  const Adduser = (e) => {
    axios
      .post(`http://localhost:3003/users`, {
        id,
        name,
      })
      .then(() => {
        setId("");
        setName("");
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      loadData();
    }, 500);
  };

  //Delete
  const deleteUser = (id) => {
    console.log(id);
    axios.delete(`http://localhost:3003/users/${id}`);
    setTimeout(() => {
      loadData();
    }, 500);
  };

  //update
  const updateUser = () => {
    console.log(updated.id, updated.name);
    axios
      .put(`http://localhost:3003/users/${updated.id}`, {
        id: updated.id,
        name: updated.name,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      loadData();
    }, 500);
  };
  return (
    <div className="App">
      <h1>CRUD</h1>
      <input
        placeholder="enter number"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        placeholder="enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={Adduser}>Add</button>

      {users.map((e) => (
        <div key={e.id}>
          {e.id} {e.name}{" "}
          <button
            onClick={() => {
              deleteUser(e.id);
            }}
          >
            delete
          </button>
        </div>
      ))}

      <div>
        <input
          placeholder="enter id"
          onChange={(e) => setUpdated({ ...updated, id: e.target.value })}
        />
        <input
          placeholder="enter name"
          onChange={(e) => setUpdated({ ...updated, name: e.target.value })}
        />
        <button onClick={updateUser}>update</button>
      </div>
    </div>
  );
}

export default App;




server:

db.json
{
  "users": [
    {
      "id": "1",
      "name": "pugal gamer"
    }
  ]
}





 "scripts": {
    "server": "json-server --watch db.json --port 3003"
  },

npm init
npm i json-server
npm run server
 
