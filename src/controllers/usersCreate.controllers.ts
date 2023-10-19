import { Request, Response } from "express";
import { AppError } from "../errors/users.errors";
import { createUsersService } from "../services/users/createUser.service";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userData = req.body;
    const newUser = await createUsersService(userData);

    return res.status(201).json(newUser);
  } catch (err: any) {
    throw new AppError(err.message);
  }
};

export { createUsersController };
