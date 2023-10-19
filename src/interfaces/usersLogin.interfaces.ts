interface IUserLoginRequest {
  email: string;
  password: string;
}

interface ILoginUserToken {
  token: string;
}

export { IUserLoginRequest, ILoginUserToken };
