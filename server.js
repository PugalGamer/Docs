const jsonServer = require("json-server");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Endpoint for file upload
server.post("/upload", (req, res) => {
  const { file, filename } = req.body;
  if (!file || !filename) {
    return res.status(400).json({ error: "No file or filename provided" });
  }

  const base64Data = file.replace(/^data:application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,/, "");
  const filepath = path.join(__dirname, "uploads", `${Date.now()}_${filename}`);

  fs.writeFile(filepath, base64Data, 'base64', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to save file" });
    }

    const fileMetadata = {
      id: Date.now(),
      filename,
      filepath,
    };

    const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
    db.files.push(fileMetadata);
    fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

    res.status(201).json(fileMetadata);
  });
});

// Endpoint to retrieve a specific file
server.get("/files/:id", (req, res) => {
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const file = db.files.find((f) => f.id === parseInt(req.params.id, 10));

  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(file.filepath, file.filename);
});

// Endpoint to retrieve all files
server.get("/files", (req, res) => {
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  res.status(200).json(db.files);
});

server.use(router);

const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port: 
    http://localhost:${port}`);
});
