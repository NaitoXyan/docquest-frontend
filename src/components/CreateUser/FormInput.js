import React from 'react';

const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  disabled = false,
  readOnly = false
}) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold text-blue-900 mb-1" htmlFor={name}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        className={`w-full bg-gray-200 p-2 rounded-md ${
          disabled ? 'cursor-not-allowed' : ''
        }`}
        required={required}
      />
    </div>
  );
};

export default FormInput;