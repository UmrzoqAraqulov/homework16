import PropTypes from "prop-types";

import './style.css'
import image from "../../assets/images/Icon.png";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ el }) => {
  const navigate = useNavigate();
  const { name, description,_id } = el;

  const enterToCategory = (id) => {
    navigate(`/category/${id}`)
  }
  return (
    <div onClick={()=>enterToCategory(_id)} className="mx-2 h-40 p-4 pt-1 border hover:bg-yellow-400">
      <img className=" bg-white rounded" src={image} alt="" />
      <h3 className="text-[#232536] font-semibold text-base sm:text-lg py-1">{name}</h3>
      <p className="text text-[#6D6E76] text-sm sm:text-base">{description}</p>
    </div>
  );
};

CategoryCard.propTypes = {
  el: PropTypes.object,
};

export default CategoryCard;
