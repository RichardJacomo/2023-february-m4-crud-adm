import { QueryResult } from "pg";
import { client } from "../../database";
import { IshowUsersRequest } from "../../interfaces/getUsers.interfaces";

const showUserProfileService = async (
  email: string
): Promise<IshowUsersRequest | undefined> => {
  const queryString: string = `
        SELECT "id", "name", "email", "admin", "active"
        FROM users
        WHERE "email" = $1;
    `;

  const queryResult: QueryResult<IshowUsersRequest> = await client.query(
    queryString,
    [email]
  );
  return queryResult.rows[0];
};

export { showUserProfileService };
