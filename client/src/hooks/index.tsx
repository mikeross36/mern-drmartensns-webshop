import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import type { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../shopping-cart-state/store";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { ShoppingCartActionType } from "../shopping-cart-state/action-types";

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useShoppingCartDispatch: () => Dispatch<ShoppingCartActionType> =
  useDispatch;

// https://medium.com/@ttennant/react-inline-styles-and-media-queries-using-a-custom-react-hook-e76fa9ec89f6
export const useMediaQuery = (query: string) => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaMatch.addEventListener("change", handler);
    return () => {
      mediaMatch.removeEventListener("change", handler);
    };
  });
  return matches;
};
// return type made according to state & setState
type ReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): ReturnType<T> => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) return JSON.parse(storedValue);
    if (typeof initialValue === "function") {
      return initialValue as React.Dispatch<React.SetStateAction<T>>;
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
};

export function useOutSideClick(
  ref: React.RefObject<HTMLDivElement>,
  cb: () => void
) {
  useEffect(() => {
    const outsideClick = (e: React.MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      cb();
    };
    document.addEventListener("mousedown", outsideClick as () => void);
    document.addEventListener("touchstart", outsideClick as () => void);
    return () => {
      document.removeEventListener("mousedown", outsideClick as () => void);
      document.removeEventListener("touchstart", outsideClick as () => void);
    };
  });
}
