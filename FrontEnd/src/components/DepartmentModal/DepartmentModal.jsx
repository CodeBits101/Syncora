import React, { useState } from 'react';
import './DepartmentModal.css';

const DepartmentModal = ({ isOpen, onClose, onAdd }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    const trimmed = departmentName.trim();

    // Validation checks
    if (!trimmed) {
      setError('Department name is required.');
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(trimmed)) {
      setError('Only letters and spaces allowed.');
      return;
    }

    if (trimmed.length > 30) {
      setError('Maximum 30 characters allowed.');
      return;
    }

    // If all validations pass
    onAdd(trimmed);
    setDepartmentName('');
    setError('');
    onClose();
  };

  const handleInputChange = (e) => {
    setDepartmentName(e.target.value);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={() => { setDepartmentName(''); setError(''); onClose(); }}>×</button>
        <h3>Add Department</h3>

        <input
          type="text"
          placeholder="Enter department name"
          className="modal-input"
          value={departmentName}
          onChange={handleInputChange}
        />

        {error && <div className="error-text">{error}</div>}

        <button className="modal-button" onClick={handleAdd}>
          Save
        </button>
      </div>
    </div>
  );
};

export default DepartmentModal;
