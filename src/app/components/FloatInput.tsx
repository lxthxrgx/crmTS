import React from "react";
import "../css/FloatInput.css";

interface Props {
  id: string;
  label: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export default function FloatInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  name
}: Props) {
  return (
    <div className="float-input">
      <input
        id={id}
        name={name ?? id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
