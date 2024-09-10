import { Link } from "react-router-dom";
import { FootwearType } from "../../types/footwear";
import { ERoutes } from "../../types/links";
import { useAppContext } from "../../hooks";

export default function SearchItem({ item }: { item: FootwearType }) {
  const { setShowSearch } = useAppContext();

  return (
    <Link
      to={`${ERoutes.footwear}/${item._id}`}
      onClick={() => {
        setShowSearch(false);
      }}
    >
      <li className="search__item">
        <span>{item.name}</span>
      </li>
    </Link>
  );
}
