// import React, { useState } from "react";

// const UploadPDF = () => {
//   const [file, setFile] = useState(null);

//   const handleFileUpload = (e) => {
//     const uploadedFile = e.target.files[0];
//     setFile(uploadedFile);
//   };

//   const handleSubmit = () => {
//     // Handle file upload to backend
//     console.log("Uploaded File:", file);
//   };

//   return (
//     <div>
//       <h2>Upload PDF</h2>
//       <input type="file" onChange={handleFileUpload} />
//       {file && <p>Selected File: {file.name}</p>}
//       <button onClick={handleSubmit}>Upload</button>
//     </div>
//   );
// };

// export default UploadPDF;

import React, { useState } from "react";

const UploadPDF = ({ onProcessingComplete }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const Ls=localStorage.getItem("token")
    console.log("from LS",Ls)

    const response = await fetch("http://localhost:5050/api/teacher/upload-pdf", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token retrieval method
      },
      body: formData,
    });

    const data = await response.json();
    setLoading(false);

    if (data.success) {
      alert("PDF uploaded and processed successfully!");
      onProcessingComplete(); // Trigger button activation
    } else {
      alert("Error uploading PDF. Please try again.");
    }
  };

  return (
    <div>
      <h3>Upload PDF</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleFileUpload} disabled={!file || loading}>
        {loading ? "Processing..." : "Upload and Process"}
      </button>
    </div>
  );
};

export default UploadPDF;