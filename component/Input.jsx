export default function Input({ props }) {
    const { name } = props
    return (
        <>
            <label className="block text-gray-700 text-sm font-bold mb-2 capitalize" htmlFor={name}>
                {name}
            </label>
            <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${props.errors.includes(name) ? 'border-red-500' : ''}`} id={name} type={props.type} placeholder={name} name={name} onChange={props.onChange} accept={props.accept}  {...props.type == 'number' && { inputMode: 'numeric', step: "any" }} />
            {props.errors.includes(name) && <p className="text-red-500 text-xs italic">Please choose a {name}.</p>}

        </>


    );
}