import { apiClient } from "./apiClient";
import { CategoryResponseType, CategoryType } from "../types/categories";

export async function getAllCategories() {
  return (await apiClient.get<CategoryResponseType>("categories")).data;
}

export async function getCategory(id: string) {
  return (await apiClient.get<CategoryType>(`categories/${id}`)).data;
}
