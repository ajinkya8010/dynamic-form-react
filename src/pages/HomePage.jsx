import React, { useState } from "react";
import DynamicForm from "../components/DynamicForm";
import TablePage from "../components/TablePage";

const HomePage = () => {
  const [selectedForm, setSelectedForm] = useState("");
  const [submittedData, setSubmittedData] = useState([]);

  const handleFormSelection = (e) => {
    setSelectedForm(e.target.value);
    setSubmittedData([]); 
  };

  const handleFormSubmit = (formData) => {
    setSubmittedData((prevData) => [...prevData, formData]); 
  };

  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
  };

  const handleEdit = (index, updatedRow) => {
    const updatedData = [...submittedData];
    updatedData[index] = updatedRow;
    setSubmittedData(updatedData);
  };

  return (
    <div className="home-page">
      <h2>Select a Form</h2>
      <select onChange={handleFormSelection} value={selectedForm}>
        <option value="">Choose Form Type</option>
        <option value="User Information">User Information</option>
        <option value="Address Information">Address Information</option>
        <option value="Payment Information">Payment Information</option>
      </select>

      {selectedForm && (
        <div className="form-container">
          <DynamicForm formType={selectedForm} onSubmit={handleFormSubmit} />
        </div>
      )}

      <TablePage
        data={submittedData}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default HomePage;
