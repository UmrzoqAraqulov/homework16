import PropTypes from "prop-types";
// import image from "../../assets/images/blogCard.png";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { IMG_URL } from "../../const/const";

const PostCard = ({ el }) => {
  const navigate = useNavigate();
  const { title, description, category, _id,photo} = el;
  const enterThisPost = (id) => {
    navigate(`/posts/${id}`);
  };
  return (
    <div className="w-full border flex gap-5 h-72 max-md:h-auto mt-5 max-[550px]:flex-col max-[550px]:w-3/4 mx-auto max-[450px]:w-full">
      <img
        className="w-2/5 h-[280px] object-cover max-[550px]:w-full"
        src={IMG_URL + photo?._id + "." + photo?.name?.split(".")[1]}
        alt="Post Img"
      />
      <div className="w-3/5 max-[550px]:w-full max-[550px]:px-4 pb-3">
        <p className="text-[#592EA9] text-sm sm:text-base pt-1 max-[550px]:py-0 max-[550px]:text-[10px]">
          {category?.name.toUpperCase()}
        </p>
        <h2 className="text-2xl sm:text-3xl text-[#232536] font-semibold pt-2 pb-4 max-[550px]:py-2">
          {title}
        </h2>
        <p className="textPost text-sm sm:text-base text-[#6D6E76] pr-4">
          {description}
        </p>
        <p onClick={() => enterThisPost(_id)} className="text-white bg-blue-600 w-28 cursor-pointer text-center py-2 mt-2 text-sm sm:text-base">More Info</p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  el: PropTypes.object,
};

export default PostCard;
