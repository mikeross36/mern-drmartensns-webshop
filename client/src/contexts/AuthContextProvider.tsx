import { createContext, useReducer, useMemo, useCallback } from "react";
import { UserType } from "../types/users";
import { useLocalStorage } from "../hooks";

type StateType = {
  authUser: UserType | null;
};

type ActionType = {
  type: string;
  payload: UserType | null;
};

export type DispatchType = (action: ActionType) => void;

const initialState: StateType = {
  authUser: null,
};

export const AuthContext = createContext<
  { state: StateType; dispatch: DispatchType } | undefined
>(undefined);

export const SET_USER = "SET_USER";

const authReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, authUser: action.payload };
    }
    default: {
      console.warn(`unhandled action type: ${action.type}`);
      return state;
    }
  }
};

const usePersistedReducer = () => {
  const [savedState, setSavedState] = useLocalStorage<StateType>(
    "authUser",
    initialState
  );
  const reducerLocalStorage = useCallback(
    (state: StateType, action: ActionType): StateType => {
      const newState = authReducer(state, action);
      setSavedState(newState);
      return newState;
    },
    [setSavedState]
  );
  return useReducer(reducerLocalStorage, savedState);
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = usePersistedReducer();
  const value = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state, dispatch]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
