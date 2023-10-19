import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/users.errors";
import { userSchema } from "../schemas/users.schemas";
import * as z from "zod";

const createUsersMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    userSchema.parse(req.body);
  } catch (err: any) {
    const requiredKeys = ["name", "email", "password"];
    if (err instanceof z.ZodError && err.issues[0].message === "Required") {
      throw new AppError(`Required keys are: ${requiredKeys}`, 400);
    } else if (err instanceof z.ZodError && err.message.includes("Expected")) {
      throw new AppError(err.issues[0].message, 400);
    } else if (err instanceof z.ZodError && err.issues[0].code) {
      throw new AppError(err.issues[0].message, 400);
    }

    throw new AppError(err.message);
  }
  next();
};

export { createUsersMiddleware };
