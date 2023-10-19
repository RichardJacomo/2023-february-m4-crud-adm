import { Request, Response } from "express";
import { AppError } from "../errors/users.errors";
import { updateUserService } from "../services/users/userUpdate.service";

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const updateData = req.body;
    const isAdmin = req.user.admin;
    const emailUserLogged = req.user.email;
    const newUpdate = await updateUserService(
      updateData,
      req.params.id,
      isAdmin,
      emailUserLogged
    );

    return res.status(200).json(newUpdate);
  } catch (err: any) {
    throw new AppError(err.message);
  }
};

export { updateUserController };
