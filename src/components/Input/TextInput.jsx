import { useState } from "react";

export default function TextInput({ onChange, label, value, ...inputProps }) {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={`relative mb-5 ${focus && "border border-primary rounded-lg"}`}
    >
      {focus || value ? (
        <label
          className={
            "absolute -top-2 left-2 text-xs bg-white text-primary px-1"
          }
        >
          {label}
        </label>
      ) : null}

      <input
        {...inputProps}
        className={`w-full p-2 ${
          !focus && "border-b"
        } bg-transparent placeholder-black dark:placeholder-white 
        focus:outline-none focus:border-primary focus:placeholder-transparent`}
        onChange={onChange}
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
}
