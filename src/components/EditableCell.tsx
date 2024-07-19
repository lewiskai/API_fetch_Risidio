import React, { useState } from 'react';

interface EditableCellProps {
  initialValue: boolean;
  onSave: (value: boolean) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({ initialValue, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleChange = () => {
    const newValue = !value;
    setValue(newValue);
    onSave(newValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        onBlur={() => setIsEditing(false)}
        autoFocus
      />
    );
  }

  return (
    <span onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }}>
      {value ? 'Yes' : 'No'}
    </span>
  );
};

export default EditableCell;