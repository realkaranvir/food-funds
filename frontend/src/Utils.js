import { jwtDecode } from "jwt-decode";

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

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) return false;

    if (!decodedToken.username || !decodedToken.name || !decodedToken.user_id)
      return false;

    return true;
  } catch (error) {
    return false;
  }
};
