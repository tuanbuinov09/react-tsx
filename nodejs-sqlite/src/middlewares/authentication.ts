import jwt, { JwtPayload } from "jsonwebtoken";

const authentication = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    /*process.env.ACCESS_TOKEN_SECRET*/ "MY_DUMMY_SECRET",
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
};


const decodeToken = (token: string) => {
  const decoded = jwt.decode(token) as JwtPayload | null;
  console.log('Decoded Token:', decoded);
  return decoded;
};

const verifyToken = (token: string, secretKey: string) => {
  try {
    const verified = jwt.verify(token, secretKey) as JwtPayload;
    console.log('Verified Token:', verified);
    return verified;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

export default authentication;
