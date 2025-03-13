import { JSX, useState } from "react";
export default function Input({ props }: { props: { [key: string]: any } }): JSX.Element {
  const { name } = props;
  const [value, setValue] = useState(props.initial_value);

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2 capitalize"
        htmlFor={name}
      >
        {name}
      </label>
      <input onChange={eve => setValue(eve.target.value)} defaultValue={value}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${props.error && "border-red-500"
          }`}
        {...props}
      />
      {props.error && (
        <p className="text-red-500 text-xs italic">Please choose a {name}.</p>
      )}
    </>
  );
}
