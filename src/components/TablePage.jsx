import React, { useState } from "react";

const TablePage = ({ data, onDelete, onEdit }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditData(data[index]);
  };

  const saveEdit = () => {
    onEdit(editingIndex, editData);
    setEditingIndex(null);
    setEditData({});
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditData({});
  };

  return (
    <div className="data-table">
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header}>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        name={header}
                        value={editData[header] || ""}
                        onChange={handleEditChange}
                      />
                    ) : (
                      row[header]
                    )}
                  </td>
                ))}
                <td>
                  {editingIndex === index ? (
                    <>
                      <button onClick={saveEdit}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(index)}>Edit</button>
                      <button onClick={() => onDelete(index)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TablePage;
