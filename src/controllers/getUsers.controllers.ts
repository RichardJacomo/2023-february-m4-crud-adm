import { Request, Response } from "express";
import { AppError } from "../errors/users.errors";
import { showUsersService } from "../services/users/getUsers.service";

const showUsersController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const newUpdate = await showUsersService();

    return res.status(200).json(newUpdate);
  } catch (err: any) {
    throw new AppError(err.message);
  }
};

export { showUsersController };
