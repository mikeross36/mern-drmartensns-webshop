import { useState, useCallback, useMemo } from "react";
import shopBcg from "@/assets/images/main-bcg-img4.jpg";
import { useGetAllFootwear } from "../features/footwear";
import { motion, MotionValue, useTransform } from "framer-motion";
import { useAppContext } from "../hooks";
import { ESelectedPage } from "../types/links";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { FootwearType } from "../types/footwear";
import { useMediaQuery } from "../hooks";
import Spinner from "../components/Spinner";
import Tilt from "react-parallax-tilt";
import ShopItem from "../components/ShopItem";

type PropsType = {
  scrollYProgress: MotionValue<number>;
  itemsPerPage?: number;
  pageBtnsPerPagination?: number;
};

export default function ShopPage({
  scrollYProgress,
  itemsPerPage = 4,
  pageBtnsPerPagination = 4,
}: PropsType) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, status, error } = useGetAllFootwear();
  const { setSelectedPage } = useAppContext();

  const isTransform = useMediaQuery("(min-width:768px)");

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  let totalPages = 0;
  if (data) {
    totalPages = Math.round(data.length / itemsPerPage);
  }

  function setPageItems(): FootwearType[] | undefined {
    const startIdx = currentPage * itemsPerPage - itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const visibleItems: FootwearType[] | undefined = data
      ? data.slice(startIdx, endIdx)
      : [];
    return visibleItems;
  }

  const prevPage = useCallback(() => {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const nextPage = useCallback(() => {
    if (currentPage !== totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage]);

  const setPageButtons = useMemo(() => {
    const startIdx =
      Math.floor((currentPage - 1) / pageBtnsPerPagination) *
      pageBtnsPerPagination;
    return [...Array(pageBtnsPerPagination).keys()].map((_, idx) => {
      return startIdx + idx + 1;
    });
  }, [currentPage, pageBtnsPerPagination]);

  function changeCurrentPage(e: React.MouseEvent<HTMLButtonElement>) {
    const pageNum = Number((e.target as HTMLButtonElement).textContent);
    setCurrentPage(pageNum);
  }

  return (
    <motion.section
      className="shop"
      id="shop"
      onViewportEnter={() => setSelectedPage(ESelectedPage.shop)}
      style={isTransform ? { scale, rotate } : undefined}
    >
      <div className="shop__background-img">
        <img src={shopBcg} alt="shop page background image" />
      </div>
      {status === "pending" ? (
        <Spinner />
      ) : error instanceof AxiosError ? (
        toast.error(error.message)
      ) : (
        <motion.ul className="shop__container grid">
          {data &&
            data.length > 0 &&
            setPageItems()?.map((item) => {
              return (
                <Tilt
                  key={item._id}
                  perspective={2000}
                  glareEnable={true}
                  glareMaxOpacity={0.45}
                  scale={1.02}
                  gyroscope={true}
                >
                  <ShopItem item={item} />
                </Tilt>
              );
            })}
        </motion.ul>
      )}
      <div className="shop__pagination">
        <button
          onClick={prevPage}
          className={`page__nav-btn ${currentPage === 1 && "disabled-btn"}`}
        >
          prev
        </button>
        {setPageButtons.map((pageNum: number, idx: number) => {
          return (
            <button
              key={idx}
              onClick={changeCurrentPage}
              type="button"
              className={`page__number ${
                currentPage === pageNum
                  ? "active-btn"
                  : currentPage >= totalPages && "disabled-btn"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          onClick={nextPage}
          className={`page__nav-btn ${
            currentPage >= totalPages && "disabled-btn"
          }`}
        >
          next
        </button>
      </div>
    </motion.section>
  );
}
