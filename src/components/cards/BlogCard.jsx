import PropTypes from "prop-types";
import './style.css';

import { Link } from "react-router-dom";
import { IMG_URL } from "../../const/const";

const BlogCard = ({ el }) => {
  const { user, title, description,_id ,photo} = el;
  const {first_name,last_name} = user;
  return (
    <div className="mx-2 border">
      <img src={IMG_URL+photo?._id + "." + photo.name?.split(".")[1]} className="w-full h-[200px]  object-cover object-top" alt="Img" />
      <div className="p-4">
        <p className="text-xs">
          By
          <span className="text-violet-600">
            {first_name + " " + last_name}
          </span>
          l Aug 23, 2021
        </p>
        <h2 className="font-semibold py-2 text-2xl">{title}</h2>
        <p className="text text-sm sm:text-base text-[#232536]">{description}</p>
      <Link to={`posts/${_id}`} className="bg-blue-700 text-white py-2 px-4 mt-4 inline-block">
        More Info
      </Link>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  el: PropTypes.object,
};

export default BlogCard;
