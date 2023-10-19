import { Request, Response } from "express";
import { AppError } from "../errors/users.errors";
import { softDeleteUserService } from "../services/users/softDeleteUser.service";

const softDeleteUserController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const isAdmin = req.user.admin;
    const emailUserLogged = req.user.email;
    await softDeleteUserService(
      Number(req.params.id),
      isAdmin,
      emailUserLogged
    );

    return res.status(204).json();
  } catch (err: any) {
    throw new AppError(err.message);
  }
};

export { softDeleteUserController };
