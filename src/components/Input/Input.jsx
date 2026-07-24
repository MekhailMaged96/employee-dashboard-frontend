import { forwardRef } from "react";

const Input = forwardRef(function Input({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  disabled = false,
  required = false,
}, ref) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        ref={ref}
        className="
          rounded-md
          border
          border-gray-300
          px-3
          py-2
          outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          disabled:bg-gray-100
        "
      />

      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
});

export default Input;
