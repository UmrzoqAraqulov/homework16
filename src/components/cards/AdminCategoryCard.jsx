import PropTypes from "prop-types";
import { IMG_URL } from "../../const/const";

const AdminCategoryCard = ({
  _id,
  photo,
  name,
  description,
  deleteCategoryQuestion,
  edit,
}) => {
  return (
    <div>
      <img
        className="h-40 w-full object-cover"
        src={IMG_URL + photo?._id + "." + photo?.name.split(".")[1]}
        alt="Category Img"
      />
      <h3 className="py-1 text-xl font-semibold">{name}</h3>
      <p className="text">{description}</p>
      <div className="flex gap-2 pt-1">
        <button onClick={()=>edit(_id)} className="py-1 px-3 rounded-[2px] hover:scale-105 bg-blue-600 text-white">
          edit
        </button>
        <button
          onClick={() => deleteCategoryQuestion(_id)}
          className="py-1 px-3 rounded-[2px] hover:scale-105 bg-red-600 text-white"
        >
          delete
        </button>
      </div>
    </div>
  );
};

AdminCategoryCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  photo: PropTypes.object,
  _id: PropTypes.string,
  deleteCategoryQuestion: PropTypes.func,
  edit: PropTypes.func,
};

export default AdminCategoryCard;
