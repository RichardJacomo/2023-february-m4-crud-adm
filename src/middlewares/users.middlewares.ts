import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import { AppError } from "../errors/users.errors";
import { iUserWithActive } from "../interfaces/users.interfaces";

const verifyEmailExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const queryStringEmail = `
    SELECT *
    FROM users;
  `;
  const queryResultEmail = await client.query(queryStringEmail);
  const verifyEmailExist = queryResultEmail.rows.find((e: iUserWithActive) => {
    return e.email === req.body.email;
  });
  if (verifyEmailExist) {
    throw new AppError("E-mail already registered", 409);
  }
  return next();
};

export { verifyEmailExistMiddleware };
