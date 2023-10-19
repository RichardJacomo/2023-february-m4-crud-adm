import { Request, Response } from "express";
import { AppError } from "../errors/users.errors";
import { recoverUserService } from "../services/users/recoverUser.services";

const recoverUserController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const resultService = await recoverUserService(Number(req.params.id));

    return res.status(200).json(resultService);
  } catch (err: any) {
    throw new AppError(err.message);
  }
};

export { recoverUserController };
