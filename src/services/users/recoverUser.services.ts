import { QueryResult } from "pg";
import { client } from "../../database";
import { IshowUsersRequest } from "../../interfaces/getUsers.interfaces";

const recoverUserService = async (id: number) => {
  const queryString: string = `
      UPDATE users
      SET "active" = true
      WHERE id = $1
      RETURNING "id", "name", "email", "admin", "active"
    `;

  const queryResult: QueryResult<IshowUsersRequest> = await client.query(
    queryString,
    [id]
  );
  return queryResult.rows[0];
};

export { recoverUserService };
