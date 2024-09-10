import Button from "./Button";
import Spinner from "./Spinner";
import { useAddReview } from "../features/reviews";
import { useState } from "react";

export default function AddReview({ footwearId }: { footwearId: string }) {
  const [content, setContent] = useState<string>("");
  const { mutate: addReviewAction, isPending } = useAddReview();

  function handleAddReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addReviewAction(
      { id: footwearId, content },
      { onSettled: () => setContent("") }
    );
  }

  if (isPending) {
    return <Spinner />;
  }
  return (
    <section className="add__review">
      <div className="review__form-bcg">
        <form className="review__form" onSubmit={handleAddReview}>
          <div className="form__field">
            <label htmlFor="review-content" className="form__label">
              add review
            </label>
            <textarea
              name="content"
              id="review-content"
              className="text__input"
              cols={4}
              rows={5}
              maxLength={300}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button type="submit" className="button button-light" text="save" />
        </form>
      </div>
    </section>
  );
}
