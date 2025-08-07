export const formatToLocalDateTime = (date) => {
  const local = new Date(date);
  return local.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:mm:ss"
};