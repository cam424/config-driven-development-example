import React, { useEffect, useState } from "react";

export default function InputField({label, placeholder, value, onChange}) {
  const [freshValue, setFreshValue] = useState('');

  useEffect(() => {
    if (!value) return;
    setFreshValue(value)
  }, [value]);

  return (
    <div className="rounded-md bg-white mt-4 p-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
      <label htmlFor={`${label}Name`} className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
        {label}
      </label>
      <input
        id={`${label}Id`}
        name={`${label}Name`}
        type="text"
        placeholder={placeholder}
        value={freshValue}
        onChange={onChange}
        className="block w-full text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
      />
    </div>
  )
}
