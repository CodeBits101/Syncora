export const getToken = () => {
  const token = localStorage.getItem("token") || Cookies.get("token");
if (!token) {
  throw new Error("JWT token not found in localStorage or cookies");
}
 return token;
}