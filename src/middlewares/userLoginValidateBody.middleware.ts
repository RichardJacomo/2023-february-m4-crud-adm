import * as z from "zod";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/users.errors";
import { userLoginSchema } from "../schemas/usersLogin.schema";

const loginUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    userLoginSchema.parse(req.body);
  } catch (err: any) {
    const requiredKeys = ["email", "password"];

    if (err instanceof z.ZodError && err.issues[0].message === "Required") {
      throw new AppError(`Required keys are: ${requiredKeys}`, 400);
    } else if (err instanceof z.ZodError && err.message.includes("Expected")) {
      throw new AppError(err.issues[0].message, 400);
    } else if (
      err instanceof z.ZodError &&
      err.issues[0].message === "Invalid email"
    ) {
      throw new AppError(err.issues[0].message, 400);
    }

    throw new AppError(err.message);
  }
  next();
};

export { loginUserMiddleware };
