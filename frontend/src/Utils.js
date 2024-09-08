export const getStartAndEndOfMonth = (year, month) => {
  let date = null;
  if (year && month) {
    date = new Date(year, month, 1);
  } else {
    date = new Date(); // if no year or month value provided, do current month
  }
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0); // Last day of the month
  return { startOfMonth, endOfMonth };
};
