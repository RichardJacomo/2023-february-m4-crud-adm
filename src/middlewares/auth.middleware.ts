import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { AppError } from "../errors/users.errors";
import { IDecodedToken } from "../interfaces/authUser.interfaces";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authToken: string | undefined = req.headers.authorization;
  const token: string | undefined = authToken?.split(" ")[1]!;
  try {
    if (!authToken) {
      throw new AppError("Missing authorization token", 401);
    }
    const decoded: IDecodedToken & JwtPayload = await new Promise(
      (resolve, reject) => {
        verify(
          token,
          String(process.env.SECRET_KEY),
          (error: any, decoded: any) => {
            if (error) {
              reject(new AppError(error.message, 401));
            }
            resolve(decoded);
          }
        );
      }
    );
    req.user = {
      email: decoded.email,
      admin: decoded.sub,
    };

    next();
  } catch (error: any) {
    throw new AppError("Missing authorization token", 401);
  }
};

export { authMiddleware };
