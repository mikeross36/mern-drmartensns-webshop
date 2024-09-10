import { apiClient } from "./apiClient";
import {
  UserResponseType,
  ILoginResponse,
  IGenericResponse,
} from "../types/users";

export async function refreshAccessToken() {
  return (await apiClient.get<ILoginResponse>("/auth/refresh-token")).data;
}

export async function registerUser(
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  return (
    await apiClient.post("/auth/register", {
      userName,
      email,
      password,
      confirmPassword,
    })
  ).data;
}

export async function loginUser(email: string, password: string) {
  return (
    await apiClient.post<ILoginResponse>("/auth/login", { email, password })
  ).data;
}

export async function verifyEmail(userId: string, verificationString: string) {
  return (await apiClient.post(`/auth/verify/${userId}/${verificationString}`))
    .data;
}

export async function logoutUser() {
  return (await apiClient.post<IGenericResponse>("/auth/logout")).data;
}

export async function getUserInfo() {
  return (await apiClient.get<UserResponseType>("/users/loggedin-info")).data;
}

export async function forgotPassword(email: string) {
  return (
    await apiClient.post<IGenericResponse>("auth/forgot-password", {
      email,
    })
  ).data;
}

export async function resetPassword(
  resetString: string,
  password: string,
  confirmPassword: string
) {
  return (
    await apiClient.patch(`auth/reset-password/${resetString}`, {
      password,
      confirmPassword,
    })
  ).data;
}

export async function updatePassword(
  currentPassword: string,
  password: string,
  confirmPassword: string
) {
  return await apiClient.patch<IGenericResponse>("auth/update-password", {
    currentPassword,
    password,
    confirmPassword,
  });
}
