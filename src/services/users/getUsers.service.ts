import { client } from "../../database";
import { ishowUsersResult } from "../../interfaces/getUsers.interfaces";
const showUsersService = async () => {
  const queryString: string = `
    SELECT "id", "name", "email", "admin", "active"
    FROM users;
  `;
  const queryResult: ishowUsersResult = await client.query(queryString);
  return queryResult.rows;
};

export { showUsersService };
