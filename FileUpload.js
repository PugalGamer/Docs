import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }

    try {
      const base64File = await convertFileToBase64(file);
      const res = await axios.post('http://localhost:3001/upload', {
        file: base64File,
        filename: file.name
      });

      setMessage('File uploaded successfully');
    } catch (err) {
      console.error(err);
      setMessage('Failed to upload file');
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload Base64 xlsx File:</Form.Label>
        <Form.Control type="file" onChange={onFileChange} />
      </Form.Group>
      <Button variant="info" type="submit">
        Upload
      </Button>
      {message && <Alert className="mt-3">{message}</Alert>}
    </Form>
  );
};

export default FileUpload;
