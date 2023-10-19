import { Request, Response } from "express";
import { AppError } from "../errors/users.errors";
import { showUserProfileService } from "../services/users/getUserProfile.services";

const showUserProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const reqUser = req.user;

    const returnServices = await showUserProfileService(reqUser.email);

    return res.status(200).json(returnServices);
  } catch (err: any) {
    throw new AppError(err.message);
  }
};

export { showUserProfileController };
