import React, { useState, useEffect } from "react";
import { fetchFormFields } from "../utils/mockApi";
import ProgressBar from "./ProgressBar";

const DynamicForm = ({ formType, onSubmit }) => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchFormFields(formType).then((response) => setFields(response.fields));
  }, [formType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({}); 
      alert("Form Submitted Successfully");
    }
  };

  const requiredFields = fields.filter((field) => field.required).length;
  const completedFields = fields.filter(
    (field) => field.required && formData[field.name]
  ).length;

  return (
    <div className="form-container">
      <ProgressBar completed={completedFields} total={requiredFields} />
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <label>{field.label}</label>
            {field.type === "dropdown" ? (
              <select name={field.name} onChange={handleChange} value={formData[field.name] || ""}>
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
              />
            )}
            {errors[field.name] && <p className="error">{errors[field.name]}</p>}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DynamicForm;
