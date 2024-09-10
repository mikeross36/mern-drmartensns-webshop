import { useCallback, useEffect } from "react";
import { useAuthContext } from "../hooks";
import { useCookies } from "react-cookie";
import { UserResponseType } from "../types/users";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/auth";
import { SET_USER } from "../contexts/AuthContextProvider";
import Spinner from "../components/Spinner";

export default function AuthMiddleware({
  children,
}: {
  children: React.ReactNode;
}) {
  const authContext = useAuthContext();
  // name of cookie has nothig to do with the name of server's cookies
  const [cookies] = useCookies(["mojDjoka"]);

  const memoizedSelect = useCallback(
    (data: UserResponseType) => data.data.user,
    []
  );

  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserInfo,
    enabled: !!cookies.mojDjoka,
    select: memoizedSelect,
  });

  const dispatch = authContext?.dispatch;

  useEffect(() => {
    if (query.isSuccess && dispatch) {
      dispatch({ type: SET_USER, payload: query.data });
    }
  }, [query.data, query.isSuccess, dispatch]);

  if (query.isLoading) {
    return <Spinner />;
  }

  return children;
}
