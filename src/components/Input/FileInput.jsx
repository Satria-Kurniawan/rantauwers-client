export default function FileInput({
  label,
  onChange,
  fileName,
  ...otherProps
}) {
  return (
    <div>
      <label htmlFor="fileInput">
        <h1 className="mb-1">{label}</h1>
        <div className="flex">
          <div className="bg-black rounded-l-lg text-white py-2 px-4 cursor-pointer">
            Choose
          </div>
          <div className="w-full bg-white border rounded-r-lg py-2 px-4">
            {fileName && fileName}
          </div>
        </div>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={onChange}
          {...otherProps}
        />
      </label>
    </div>
  );
}
