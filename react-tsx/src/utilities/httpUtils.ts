export const buildAuthorizationHeader = () => {
  const token = localStorage.getItem("token");
  const tokenString = JSON.parse(token as string);
  return { Authorization: `Bearer ${tokenString}` };
};
