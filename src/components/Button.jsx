export default function Button({
  isPrimary,
  text,
  hasIcon,
  icon,
  leftIcon,
  className = "",
}) {
  return (
    <button
      className={`${
        isPrimary && "border border-primary bg-primary text-white"
      } py-2 px-4 rounded-lg ${className}`}
    >
      <div className="flex gap-x-3 justify-center items-center">
        {!hasIcon ? (
          <span>{text}</span>
        ) : leftIcon ? (
          <>
            <span>{icon}</span>
            <span>{text}</span>
          </>
        ) : (
          <>
            <span>{text}</span>
            <span>{icon}</span>
          </>
        )}
      </div>
    </button>
  );
}
