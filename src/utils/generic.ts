export const generateHash = () => `new_${Math.random().toString(36).slice(2)}`;

export const formatDatePayload = (val) => {
  const date = new Date(val);
  if (isNaN(date.getTime())) {
    return val;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day} 03:00:00`;
};
