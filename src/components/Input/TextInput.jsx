export default function TextInput({ onChange, label, value, ...inputProps }) {
  return (
    <div className="mb-5">
      <input
        {...inputProps}
        className="w-full py-2 border-b bg-transparent placeholder-black dark:placeholder-white focus:outline-none focus:border-primary"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
