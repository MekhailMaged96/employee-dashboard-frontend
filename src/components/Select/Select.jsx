import { forwardRef } from "react";

const Select = forwardRef(function Select(
  {
    label,
    name,
    options = [],
    placeholder = "Select option",
    error,
    disabled = false,
    required = false,
    ...rest
  },
  ref
) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="font-medium text-gray-700">
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        ref={ref}
        disabled={disabled}
        required={required}
        {...rest}
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
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>

      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
});

export default Select;
