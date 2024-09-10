import { useGetAllReviews } from "../features/reviews";
import Spinner from "./Spinner";
import Review from "./Review";

export default function Reviews({ footwearId }: { footwearId: string }) {
  const { data: reviews, isPending } = useGetAllReviews();

  const footwearReviews = reviews?.filter(
    (review) => review.footwear._id === footwearId
  );

  if (isPending) {
    return <Spinner />;
  }

  return (
    <section className="reviews">
      {footwearReviews?.length === 0 ? (
        <h3 className="reviews__title">still no reviews</h3>
      ) : (
        <h3 className="reviews__title">users reviews</h3>
      )}
      <ul className="reviews__list">
        {footwearReviews?.map((review) => {
          return <Review key={review._id} review={review} />;
        })}
      </ul>
    </section>
  );
}
