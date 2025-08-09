export const formatDateForInput = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  // Convert to YYYY-MM-DD
  return date.toISOString().split("T")[0];
};