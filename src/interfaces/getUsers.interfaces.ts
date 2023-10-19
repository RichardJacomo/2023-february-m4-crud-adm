import { QueryResult } from "pg";

interface IshowUsersRequest {
  id: number;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  active: boolean;
}

type ishowUsersResult = QueryResult<IshowUsersRequest>;

export { IshowUsersRequest, ishowUsersResult };
