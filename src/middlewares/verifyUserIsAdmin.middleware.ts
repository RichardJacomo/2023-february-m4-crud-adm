import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/users.errors";

const verifyUserIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdmin = req.user.admin;

  if (isAdmin === "true") {
    next();
  } else if (isAdmin === "false") {
    throw new AppError("Insufficient Permission", 403);
  }
};

export { verifyUserIsAdmin };
