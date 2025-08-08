export const formatToLocalDateTime = (date) => {
  if (!date) return null;

  const local = date instanceof Date ? date : new Date(date);
  if (isNaN(local.getTime())) {
    console.error("Invalid date passed to formatToLocalDateTime:", date);
    return null;
  }

  return local.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:mm:ss"
};