import { FootwearType } from "../../types/footwear";
import SearchItem from "./SearchItem";

export default function SearchList({
  filteredFootwear,
}: {
  filteredFootwear: FootwearType[];
}) {
  return (
    <ul className="search__list">
      {filteredFootwear?.map((item) => {
        return <SearchItem key={item._id} item={item} />;
      })}
    </ul>
  );
}
