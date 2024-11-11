import jwt, { JwtPayload } from "jsonwebtoken";

const authentication = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  console.log(process.env.ACCESS_TOKEN_SECRET);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string, // "MY_DUMMY_SECRET",
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
};

export default authentication;
