import { Request, Response } from "express";
import { AppError } from "../errors/users.errors";
import { loginUserService } from "../services/users/userLogin.service";

const loginUserController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const loginData = req.body;
    const newLogin = await loginUserService(loginData);

    return res.status(200).json(newLogin);
  } catch (err: any) {
    throw new AppError(err.message);
  }
};

export { loginUserController };
