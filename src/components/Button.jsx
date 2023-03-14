export default function Button({ isPrimary, text, className = "" }) {
  return (
    <button
      className={`${isPrimary && "border border-primary bg-primary text-white"
        } py-1.5 px-4 rounded-lg ${className}`}
    >
      {text}
    </button>
  )
}
