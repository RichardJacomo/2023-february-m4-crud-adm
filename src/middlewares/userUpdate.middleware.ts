import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import { AppError } from "../errors/users.errors";
import * as z from "zod";
import { updateUserSchema } from "../schemas/userUpdate.schema";

const updateUserMMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    updateUserSchema.parse(req.body);
    const queryString = `
    SELECT *
    FROM users
    WHERE id = $1;
    `;
    const queryResult = await client.query(queryString, [req.params.id]);
    if (queryResult.rows[0]) {
      return next();
    }

    if (!queryResult.rows[0]) {
      throw new z.ZodError([
        {
          path: ["id"],
          message: "User not found",
          code: z.ZodIssueCode.custom,
        },
      ]);
    }
  } catch (err: any) {
    if (err.issues[0].message.includes("Expected")) {
      throw new AppError(err.issues[0].message, 400);
    }
    if (err instanceof z.ZodError) {
      throw new AppError("User not found", 404);
    }
  }
  next();
};

export { updateUserMMiddleware };
