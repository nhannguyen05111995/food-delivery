import Input from "@/component/Input";

export default function Form({ props }) {
  const form = [
    { name: "name", type: "text", error: false, value: "", extra: {} },
    { name: "cuisine", type: "text", error: false, value: "", extra: {} },
    {
      name: "price",
      type: "number",
      error: false,
      value: "",
      extra: { inputMode: "numeric", step: "any" },
    },
  ];
  return (
    <div className="w-full">
      <form
        className="pt-6 pb-8 mb-4 max-w-xs mx-auto"
        onSubmit={props.handleSubmit}
      >
        {form.map((input) => (
          <div className="mb-4">
            <Input 
              props={{ name: input.name, type: input.type, error: input.error, extra: input.extra }}
            />
          </div>
        ))}

       {/*  <div className="mb-4">
          <Input
            props={{ name: "cuisine", type: "text", errors: props.errors }}
          />
        </div>
        <div className="mb-4">
          <Input
            props={{ name: "description", type: "text", errors: props.errors }}
          />
        </div>
        <div className="mb-4">
          <Input
            props={{ name: "price", type: "number", errors: props.errors }}
          />
        </div>
        <div className="mb-4">
          <Input
            props={{
              name: "image",
              type: "file",
              errors: props.errors,
              onChange: props.onImageChange,
              ref: props.fileInput,
              accept: "image/png, image/jpeg",
            }}
          />
          {props.image && <img alt="preview image" src={props.image} />}
        </div> */}
        <div className="flex items-center justify-between form-action">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={props.loading}
          >
            Add meal
          </button>
        </div>
      </form>
    </div>
  );
}
