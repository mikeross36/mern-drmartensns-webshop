import { Link, useParams } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import { GiSteeltoeBoots } from "react-icons/gi";
import { ERoutes } from "../types/links";
import categoryBcgImg from "@/assets/images/main-bcg-img3.jpg";
import { useGetCategory } from "../features/categories";
import ShopItem from "../components/ShopItem";
import Spinner from "../components/Spinner";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function Category() {
  const { id } = useParams();
  const { data, status, error } = useGetCategory(id!);

  return (
    <section className="category section">
      <div className="category__header">
        <Link to={ERoutes.home}>
          <FaBackward size={40} fill="#ffa500" />
        </Link>
        <div className="category__background-img">
          <img src={categoryBcgImg} alt="category page background photo" />
        </div>
        <div className="logo__icon">
          <GiSteeltoeBoots size={60} className="logo__icon-boot" />
          <span className="logo__icon-text">home</span>
        </div>
      </div>
      <h3 className="section__title"></h3>
      {status === "pending" ? (
        <Spinner />
      ) : error instanceof AxiosError ? (
        toast.error(error.message)
      ) : (
        data && (
          <ul className="category__container grid">
            {data.length > 0 &&
              data.map((item) => {
                return <ShopItem key={item._id} item={item} />;
              })}
          </ul>
        )
      )}
    </section>
  );
}
