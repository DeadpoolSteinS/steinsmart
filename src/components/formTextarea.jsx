import React from "react";

function FormTextarea(props) {
  const { label, placeholder, value, onChange, id, className } = props;

  return (
    <div className={className}>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      ></textarea>
    </div>
  );
}

export default FormTextarea;
