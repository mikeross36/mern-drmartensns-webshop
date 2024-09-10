import { useAppContext } from "../../hooks";
import { FaTimes } from "react-icons/fa";
import Spinner from "../Spinner";

type PropsType = {
  handleSearchFootwear: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  searchRef: React.RefObject<HTMLInputElement>;
};

export default function SearchForm({
  handleSearchFootwear,
  isPending,
  searchRef,
}: PropsType) {
  const { showSearch, setShowSearch } = useAppContext();

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      <form
        className={`nav__search-form ${showSearch && "active-form"}`}
        onSubmit={handleSearchFootwear}
      >
        <label htmlFor="search-input">
          <FaTimes
            size={20}
            onClick={() => setShowSearch(false)}
            className="search__close"
          />
          <input
            type="search"
            className="search__input"
            id="search-input"
            placeholder="search..."
            ref={searchRef}
          />
        </label>
      </form>
    </>
  );
}
