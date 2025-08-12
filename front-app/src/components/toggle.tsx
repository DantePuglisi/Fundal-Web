import React from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, id }) => (
  <label className="flex items-center gap-2 cursor-pointer" htmlFor={id}>
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={() => onChange(!checked)}
      className="sr-only"
    />
    <div className="relative">
      <div
        className={`w-14 h-7 rounded-full transition-colors duration-200 ease-in-out ${
          checked ? "bg-teal-600" : "bg-gray-300"
        }`}
      />
      <div
        className={`absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full shadow transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </div>
    {label && <span className="ml-2 text-gray-700">{label}</span>}
  </label>
);

export default Toggle;