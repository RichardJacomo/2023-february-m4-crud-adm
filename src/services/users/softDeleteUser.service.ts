import { QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors/users.errors";
import { IshowUsersRequest } from "../../interfaces/getUsers.interfaces";
const softDeleteUserService = async (
  id: number,
  isAdmin: string,
  emailUserLogged: string
) => {
  if (isAdmin === "true") {
    const queryString: string = `
        UPDATE users
        SET "active" = false
        WHERE id = $1; 
      `;

    const queryResult: QueryResult<IshowUsersRequest> = await client.query(
      queryString,
      [id]
    );
    return queryResult.rows;
  }

  const queryStringId: string = `
  SELECT "id"
  FROM users
  WHERE "email" = $1;
`;
  const queryResultId = await client.query(queryStringId, [emailUserLogged]);
  const idUserLogged = queryResultId.rows[0].id;

  if (isAdmin === "false") {
    if (id === idUserLogged) {
      const queryString: string = `
        UPDATE users
        SET "active" = false
        WHERE id = $1; 
      `;

      const queryResult: QueryResult<IshowUsersRequest> = await client.query(
        queryString,
        [id]
      );
      return queryResult.rows;
    } else {
      throw new AppError("Insufficient Permission", 403);
    }
  }
};

export { softDeleteUserService };
