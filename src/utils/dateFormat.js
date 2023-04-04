export function dateFormat(dateString) {
  const date = new Date(dateString);

  return date.toLocaleString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
