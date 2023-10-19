import { sign } from "jsonwebtoken";
import { client } from "../../database";
import { iUserWithActive } from "../../interfaces/users.interfaces";
import {
  ILoginUserToken,
  IUserLoginRequest,
} from "../../interfaces/usersLogin.interfaces";

const loginUserService = async (
  userData: IUserLoginRequest
): Promise<ILoginUserToken> => {
  const queryString: string = `
    SELECT *
    FROM users;
  `;
  const queryResult = await client.query(queryString);
  const findEmail = queryResult.rows.find(
    (e: iUserWithActive) => e.email === userData.email
  );

  const token: string = sign(
    { email: findEmail.email },
    String(process.env.SECRET_KEY),
    { expiresIn: "24h", subject: String(findEmail.admin) }
  );

  return { token };
};

export { loginUserService };
