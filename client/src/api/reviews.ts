import { IGenericResponse } from "../types/users";
import { IReviewResponse } from "../types/reviews";
import { apiClient } from "./apiClient";

export async function addReview(id: string, content: string) {
  return (
    await apiClient.post<IGenericResponse>(`/footwear/${id}/reviews`, {
      content,
    })
  ).data;
}

export async function getAllReviews() {
  return (await apiClient.get<IReviewResponse>("/reviews")).data;
}
