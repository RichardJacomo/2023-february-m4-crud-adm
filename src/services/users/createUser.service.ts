import {
  IUserRequest,
  IUserResult,
  IUserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { hash } from "bcryptjs";

const createUsersService = async (
  userData: IUserRequest
): Promise<IUserWithoutPassword | void> => {
  const hashedPassword = await hash(userData.password, 10);

  const queryString: string = `
    INSERT INTO
        users("name", "email", "password", "admin")
    VALUES($1, $2, $3, $4)
    RETURNING "id", "name", "email", "admin", "active";    
  `;
  const values = [];
  values.push(userData.name);
  values.push(userData.email);
  values.push(hashedPassword);
  values.push(userData.admin ? userData.admin : false);
  const queryResult: IUserResult = await client.query(queryString, values);
  return queryResult.rows[0];
};

export { createUsersService };
