import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Button, Table, Modal } from "react-bootstrap";
import * as XLSX from "xlsx";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [xlsxData, setXlsxData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("http://localhost:3001/files");
        setFiles(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFiles();
  }, []);

  const downloadFile = async (id, filename) => {
    try {
      const res = await axios.get(`http://localhost:3001/files/${id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  const readXlsxFile = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/files/${id}`, {
        responseType: "arraybuffer",
      });
      const data = new Uint8Array(res.data);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setXlsxData(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  const viewFile = (file) => {
    const { id, filename } = file;
    const fileType = filename.split(".").pop();

    if (fileType === "xlsx") {
      readXlsxFile(id);
    } else if (
      fileType === "png" ||
      fileType === "jpg" ||
      fileType === "jpeg"
    ) {
      setModalContent(
        <img
          src={`http://localhost:3001/files/${id}`}
          alt={filename}
          style={{ width: "100%" }}
        />
      );
      setModalShow(true);
    } else if (fileType === "mp4") {
      setModalContent(
        <video controls style={{ width: "100%" }}>
          <source src={`http://localhost:3001/files/${id}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
      setModalShow(true);
    }
  };

  return (
    <>
      <ListGroup>
        {files.map((file) => (
          <ListGroup.Item key={file.id}>
            {file.filename}
            <Button
              variant="link"
              onClick={() => downloadFile(file.id, file.filename)}
            >
              Download
            </Button>
            <Button variant="link" onClick={() => viewFile(file)}>
              View
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {xlsxData.length > 0 && (
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              {Object.keys(xlsxData[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {xlsxData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>File Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
      </Modal>
    </>
  );
};

export default FileList;
