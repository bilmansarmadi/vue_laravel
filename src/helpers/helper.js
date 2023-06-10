export function formatDate() {
  return new Date()
    .toISOString()
    .substr(0, 10)
    .match(/([^T]+)/)[0]
    .split("-")
    .reverse()
    .join("-");
}
