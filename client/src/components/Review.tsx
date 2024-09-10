import { ReviewType } from "../types/reviews";

export default function Review({ review }: { review: ReviewType }) {
  const photoPreview = new URL(
    "../assets/images/users/default.jpg",
    import.meta.url
  ).href;
  const userPhoto = new URL(
    `../assets/images/users/${review.user.photo}`,
    import.meta.url
  ).href;

  return (
    <li className="review__card">
      <div className="review__awatar">
        {review.user && !review.user.photo ? (
          <div className="awatar__image">
            <img
              src={photoPreview}
              alt="review's author photo"
              className="awatar__img"
            />
          </div>
        ) : (
          <div className="awatar__image">
            <img
              src={userPhoto}
              alt="review's author photo"
              className="awatar__img"
            />
          </div>
        )}
        <p className="review__user">{review.user?.userName}</p>
      </div>
      <p className="review__content">{review.content}</p>
    </li>
  );
}
