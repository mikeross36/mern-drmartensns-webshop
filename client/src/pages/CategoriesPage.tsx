import { motion, MotionValue, useTransform } from "framer-motion";
import { useAppContext } from "../hooks";
import { ESelectedPage } from "../types/links";
import { useGetAllCategories } from "../features/categories";
import Spinner from "../components/Spinner";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CategoryType } from "../types/categories";
import { useMediaQuery } from "../hooks";
import CategoryCard from "../components/CategoryCard";

export default function CategoriesPage({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const { setSelectedPage } = useAppContext();
  const { data, status, error } = useGetAllCategories();

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  const isTransform = useMediaQuery("(min-width:768px)");

  return (
    <motion.section
      className="categories"
      id="categories"
      onViewportEnter={() => setSelectedPage(ESelectedPage.categories)}
      style={isTransform ? { scale, rotate } : undefined}
    >
      <div className="page__title">
        <h3>choose your</h3>
        <h3>footwear by</h3>
        <h3> categories</h3>
      </div>
      {status === "pending" ? (
        <Spinner />
      ) : error instanceof AxiosError ? (
        toast.error(error.message)
      ) : (
        <ul className="categories__wrapper">
          {data &&
            data.length > 0 &&
            data.map((category: CategoryType) => {
              return <CategoryCard key={category._id} category={category} />;
            })}
        </ul>
      )}
    </motion.section>
  );
}
