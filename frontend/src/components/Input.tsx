import React, { ChangeEvent } from 'react';

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, type, value, onChange, required }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-bold mb-2" htmlFor={label}>
        {label}
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        id={label}
      />
    </div>
  );
};

export default Input;