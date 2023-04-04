export default function CheckboxInput({
  value,
  onChange,
  onClick,
  defaultChecked,
  checked,
  readOnly,
  disabled,
  content,
}) {
  return (
    <div className="flex gap-x-3 items-center">
      <input
        type="checkbox"
        value={value}
        onChange={onChange}
        onClick={onClick}
        defaultChecked={defaultChecked}
        checked={checked}
        readOnly={readOnly}
        disabled={disabled}
      />
      <span>{content}</span>
    </div>
  );
}
