import AnchorLink from "react-anchor-link-smooth-scroll";
import { useAppContext } from "../../hooks";
import { ESelectedPage } from "../../types/links";

export default function NavMenuLink({ page }: { page: string }) {
  const { setSelectedPage, selectedPage, isTopOfPage } = useAppContext();

  return (
    <AnchorLink
      onClick={() => setSelectedPage(page as ESelectedPage)}
      className={`nav__link ${selectedPage === page && "active"} ${
        isTopOfPage ? "" : "scroll-icon"
      }`}
      href={`#${page}`}
    >
      {page}
    </AnchorLink>
  );
}
