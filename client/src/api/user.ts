import { apiClient } from "./apiClient";

export async function updateUserAccount(
  userName: string,
  email: string,
  formData: FormData
) {
  return (
    await apiClient.patch(`/users/update-user-account`, {
      userName,
      email,
      formData,
    })
  ).data;
}
