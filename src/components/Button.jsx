export default function Button({ isPrimary, text, className = "" }) {
  return (
    <button
      className={`${
        isPrimary && "bg-primary"
      } py-1.5 px-4 rounded-lg ${className}`}
    >
      {text}
    </button>
  )
}
