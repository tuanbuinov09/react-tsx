import jwt, { JwtPayload } from "jsonwebtoken";

export const decodeToken = (token: string) => {
  const decoded = jwt.decode(token) as JwtPayload | null;
  console.log("Decoded Token:", decoded);
  return decoded;
};
