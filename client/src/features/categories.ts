import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { CategoryResponseType, CategoryType } from "../types/categories";
import { getAllCategories, getCategory } from "../api/categories";

export function useGetAllCategories() {
  const memoizedSelectet = useCallback(
    (data: CategoryResponseType) => data.data.categories,
    []
  );
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    select: memoizedSelectet,
  });
}

export function useGetCategory(id: string) {
  const memoizedSelectet = useCallback(
    (data: CategoryType) => data.footwears,
    []
  );
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategory(id) as Promise<CategoryType>,
    select: memoizedSelectet,
  });
}
