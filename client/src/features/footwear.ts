import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllFootwear, getFootwear } from "../api/footwear";
import { FootwearResponseType } from "../types/footwear";

export function useGetAllFootwear() {
  const memoizedSelect = useCallback(
    (data: FootwearResponseType) => data.data.footwears,
    []
  );
  return useQuery({
    queryKey: ["footwear"],
    queryFn: () => {
      return getAllFootwear();
    },
    select: memoizedSelect,
  });
}

export function useGetFootwear(id: string) {
  const memoizedSelect = useCallback(
    (data: FootwearResponseType) => data.data.footwear,
    []
  );
  return useQuery({
    queryKey: ["footwear", id],
    queryFn: () => getFootwear(id),
    select: memoizedSelect,
  });
}
