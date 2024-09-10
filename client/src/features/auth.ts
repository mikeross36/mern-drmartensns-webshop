import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ERoutes } from "../types/links";
import { useAuthContext, useAppContext } from "../hooks";
import { SET_USER } from "../contexts/AuthContextProvider";

export function useRegisterUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userName,
      email,
      password,
      confirmPassword,
    }: {
      userName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => registerUser(userName, email, password, confirmPassword),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success(data.message);
      navigate(ERoutes.authpage);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useLoginUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success(data.message);
      navigate(ERoutes.home);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useLogoutUser() {
  const queryClient = useQueryClient();
  const authContext = useAuthContext();
  const dispatch = authContext?.dispatch;
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return logoutUser();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], null);
      dispatch?.({ type: SET_USER, payload: null });
      toast.success(data.message);
      navigate(ERoutes.authpage);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useForgotPassword() {
  const { setShowModalForgot } = useAppContext();
  return useMutation({
    mutationFn: ({ email }: { email: string }) => forgotPassword(email),
    onSuccess: (data) => {
      toast.success(data.message);
      setShowModalForgot(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useResetPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({
      resetString,
      password,
      confirmPassword,
    }: {
      resetString: string;
      password: string;
      confirmPassword: string;
    }) => {
      return resetPassword(resetString, password, confirmPassword);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate(ERoutes.authpage);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({
      currentPassword,
      password,
      confirmPassword,
    }: {
      currentPassword: string;
      password: string;
      confirmPassword: string;
    }) => {
      return updatePassword(currentPassword, password, confirmPassword);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate(ERoutes.authpage);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
