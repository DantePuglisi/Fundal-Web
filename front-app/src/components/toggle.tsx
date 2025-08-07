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
    <div
      className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${
        checked ? "bg-white" : "bg-white"
      }`}
    >
      <div
        className={`bg-green-500 w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
          checked ? "translate-x-5" : ""
        }`}
      ></div>
    </div>
    {label && <span className="ml-2">{label}</span>}
  </label>
);

export default Toggle;