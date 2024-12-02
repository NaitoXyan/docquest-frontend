import React from 'react';

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false
}) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold text-blue-900 mb-1" htmlFor={name}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-200 p-2 rounded-md"
        required={required}
      >
        <option value="">Select {label}</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;