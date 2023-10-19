import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors/users.errors";
import { IUserUpdateRequest } from "../../interfaces/updateUsers.interfaces";
const updateUserService = async (
  userData: IUserUpdateRequest,
  paramsId: string,
  isAdmin: string,
  emailUserLogged: string
): Promise<void> => {
  if (isAdmin === "true") {
    const queryString: string = `
      UPDATE
          users
      SET
          "name" = COALESCE($1, "name"),
          "email" = COALESCE($2, "email"),
          "password" = COALESCE($3, "password")
      WHERE
          id = $4
     RETURNING "id", "name", "email", "admin", "active";
    `;
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [userData.name, userData.email, userData.password, paramsId],
    };
    const queryResult = await client.query(queryConfig);
    return queryResult.rows[0];
  }
  const queryStringId: string = `
    SELECT "id"
    FROM users
    WHERE "email" = $1;
  `;
  const queryResultId = await client.query(queryStringId, [emailUserLogged]);
  const id = queryResultId.rows[0].id;

  if (isAdmin === "false") {
    if (Number(paramsId) === id) {
      const queryString: string = `
      UPDATE
          users
      SET
          "name" = COALESCE($1, "name"),
          "email" = COALESCE($2, "email"),
          "password" = COALESCE($3, "password")
      WHERE
          id = $4
     RETURNING "id", "name", "email", "admin", "active";
    `;
      const queryConfig: QueryConfig = {
        text: queryString,
        values: [userData.name, userData.email, userData.password, paramsId],
      };
      const queryResult = await client.query(queryConfig);
      return queryResult.rows[0];
    } else {
      throw new AppError("Insufficient Permission", 403);
    }
  }
};

export { updateUserService };
