import { compare } from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import { AppError } from "../errors/users.errors";
import { iUserWithActive } from "../interfaces/users.interfaces";

const verifyEmailLoginExistMiddleware = async (
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

  let pwdMatch: boolean = true;
  if (verifyEmailExist && req.body.password) {
    pwdMatch = await compare(req.body.password, verifyEmailExist.password);
  }
  if (!verifyEmailExist || !verifyEmailExist.active) {
    throw new AppError("Wrong email/password", 401);
  } else if (!pwdMatch) {
    throw new AppError("Wrong email/password", 401);
  }

  next();
};

export { verifyEmailLoginExistMiddleware };
