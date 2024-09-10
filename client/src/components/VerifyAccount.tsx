import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyEmail } from "../api/auth";
import { toast } from "react-toastify";
import { ERoutes } from "../types/links";

export default function VerifyAccount() {
  const { userId, verificationString } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function useVerifyEmail() {
    const { mutate } = useMutation({
      mutationFn: ({
        userId,
        verificationString,
      }: {
        userId: string;
        verificationString: string;
      }) => verifyEmail(userId, verificationString),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        toast.success(data.message);
        navigate(ERoutes.authpage);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
    return { mutate };
  }

  const { mutate: verifyEmailAction } = useVerifyEmail();

  useEffect(() => {
    if (userId && verificationString) {
      verifyEmailAction({ userId, verificationString });
    }
  }, [userId, verificationString, verifyEmailAction]);
  return <></>;
}
