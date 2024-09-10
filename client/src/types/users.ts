export type UserType = {
  _id: string;
  userName: string;
  email: string;
  role: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type UserResponseType = {
  status: string;
  message: string;
  data: {
    user: UserType;
  };
};

export interface IGenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  message: string;
  accessToken: string;
  email: string;
  password: string;
}
