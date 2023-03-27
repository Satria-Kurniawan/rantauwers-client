export default function CheckboxInput({
  value,
  onChange,
  defaultChecked,
  content,
}) {
  return (
    <div className="flex gap-x-3 items-center">
      <input
        type="checkbox"
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
      <span>{content}</span>
    </div>
  );
}
