import { CategoryType } from "../types/categories";
import { Link } from "react-router-dom";
import { ERoutes } from "../types/links";
import Button from "./Button";

export default function CategoryCard({ category }: { category: CategoryType }) {
  const coverImage = new URL(
    `../assets/images/categories/${category.coverImage}`,
    import.meta.url
  ).href;

  return (
    <li className="category__card">
      <div className="card__image">
        <img
          src={coverImage}
          alt="category card cover image"
          className="category__card-img"
        />
      </div>
      <div className="category__card-body">
        <h4 className="category__card-title">{category.name}</h4>
        <p className="category__description">{category.description}</p>
      </div>
      <div className="card__footer">
        <Link to={`${ERoutes.category}/${category._id}`}>
          <Button
            type="button"
            className="button-light"
            text={`${category.name}`}
            style={{
              fontSize: "1rem",
              paddingLeft: "4rem",
              width: "6rem",
              height: "1.8rem",
            }}
          ></Button>
        </Link>
      </div>
    </li>
  );
}
