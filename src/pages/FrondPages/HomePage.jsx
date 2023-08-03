import { Fragment, useContext } from "react";
import image from "../../assets/images/header.png";
import { Link } from "react-router-dom";
import "./style.css";
import { GeneralContextInfo } from "../../contexts/GeneralContext";
import Loading from "../../components/loading/Loading";
import Slider from "react-slick";
import CategoryCard from "../../components/cards/CategoryCard";
import BlogCard from "../../components/cards/BlogCard";
import { Empty } from "antd";
import useHomePage from "../../hooks/useHomePage";

const HomePage = () => {
  const { latestPost, loading, postsSliderLoading, postOnes } = useHomePage();
  const { categorySliderLoading, categoryOnec } =
    useContext(GeneralContextInfo);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Fragment>
      <header
        style={{
          height: "650px",
          background: `radial-gradient(30.56% 76.04% at 74.58% 0%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%),url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="flex flex-col justify-center "
      >
        {loading ? (
          <Loading />
        ) : (
          <div className="containr text-white">
            <p className="font-extralight md:text-xs text-[10px]">
              POSTED ON
              <span className="font-semibold">
                {" " + latestPost?.category?.name?.toUpperCase()}
              </span>
            </p>
            <h2 className="md:text-5xl sm:text-4xl text-3xl font-semibold py-4">
              {latestPost?.title}
            </h2>
            <p className="text-sm sm:text-base">
              By
              <span className="text-yellow-500">
                {" "+latestPost?.user?.first_name +
                  " " +
                  latestPost?.user?.last_name+" "}
              </span>
              |{" "}
              {latestPost?.createdAt?.split("T")[0]}
            </p>
            <p className="text sm:text-base text-sm pt-3 mb-10 md:w-[600px]">
              {latestPost.description}
            </p>
            <Link
              to="/post"
              className="bg-yellow-400 text-black py-3 px-5 font-semibold sm:text-base text-sm"
            >
              Read More <i className="fa-solid fa-angles-right"></i>
            </Link>
          </div>
        )}
      </header>
      <div className="containr border-b border-[#6D6E76] pt-20 pb-8">
        <div className="flex justify-between py-6  items-center">
          <h2 className="text-3xl font-bold">Popular blogs</h2>
          <Link className="text-lg hover:text-blue-600" to="/posts">
            All Posts<i className="fa-solid fa-angles-right text-sm pl-2"></i>
          </Link>
        </div>

        {postsSliderLoading ? (
          <Loading />
        ) : postOnes.length !== 0 ? (
          <div>
            <Slider {...settings}>
              {postOnes?.map((el) => (
                <BlogCard key={el._id} el={el} />
              ))}
            </Slider>
          </div>
        ) : (
          <Empty description="No Categories" />
        )}
      </div>

      <div className="containr py-8">
        <h2 className="text-center text-3xl font-semibold pb-6">
          Choose A Catagory
        </h2>
        {categorySliderLoading ? (
          <Loading />
        ) : categoryOnec.length !== 0 ? (
          <div className="w-full">
            <Slider {...settings}>
              {categoryOnec?.map((el) => (
                <CategoryCard key={el._id} el={el} />
              ))}
            </Slider>
          </div>
        ) : (
          <Empty description="No Posts" />
        )}
      </div>
    </Fragment>
  );
};

export default HomePage;
