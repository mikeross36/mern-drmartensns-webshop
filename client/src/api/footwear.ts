import { apiClient } from "./apiClient";
import { FootwearResponseType } from "../types/footwear";

export async function getAllFootwear() {
  return (await apiClient.get<FootwearResponseType>("footwear")).data;
}

export async function getFootwear(id: string) {
  return (await apiClient.get<FootwearResponseType>(`footwear/${id}`)).data;
}
