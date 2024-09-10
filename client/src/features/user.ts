import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAccount } from "../api/user";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { ERoutes } from "../types/links";

export function useUpdateUserAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userName,
      email,
      formData,
    }: {
      userName: string;
      email: string;
      formData: FormData;
    }) => {
      return updateUserAccount(userName, email, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Account updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
