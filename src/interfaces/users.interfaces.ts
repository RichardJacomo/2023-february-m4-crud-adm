import { QueryResult } from "pg";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

interface IUser extends IUserRequest {
  id: number;
}
interface iUserWithActive extends IUser {
  active: boolean;
}

type IUserWithoutPassword = Omit<IUser, "password">;
type IUserResult = QueryResult<IUserWithoutPassword>;

export {
  IUserRequest,
  IUser,
  IUserWithoutPassword,
  IUserResult,
  iUserWithActive,
};
