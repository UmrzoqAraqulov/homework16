import PropTypes from "prop-types";
import { IMG_URL } from "../../const/const";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const AdminPostCard = ({
  _id,
  photo,title,
  category,
  description,
  deletePostQuestion,
  edit,
}) => {
  return (
    <div
      key={_id}
      className="w-full border flex gap-5 "
    >
      <img
        className="w-[300px]"
        src={IMG_URL + photo?._id + "." + photo?.name?.split(".")[1]}
        alt="Post Img"
      />
      <div className=" max-[550px]:px-4 pb-3 w-auto">
        <p className="text-[#592EA9] text-sm sm:text-base py-1 max-[550px]:py-0 max-[550px]:text-[10px]">
          {category?.name?.toUpperCase()}
        </p>
        <h2
          className=" cursor-pointer text-2xl sm:text-3xl text-[#232536] font-semibold pt-3 pb-7 max-[550px]:py-2"
        >
          {title}
        </h2>
        <p className="textPost text-sm sm:text-base text-[#6D6E76]">
          {description}
        </p>
        <div className="flex mt-5 text-white">
          <div
            onClick={() => edit(_id)}
            className="cursor-pointer border bg-green-500 text-2xl hover:bg-gray-400"
          >
            <EditOutlined style={{ padding: "8px 30px" }} />
          </div>

          <div
            onClick={() => deletePostQuestion(_id)}
            className="cursor-pointer border text-xl hover:bg-gray-400 bg-red-600 sm:px-1 sm:py-2"
          >
            <DeleteOutlined style={{ padding: "6px 24px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

AdminPostCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  photo: PropTypes.object,
  _id: PropTypes.string,
  deletePostQuestion: PropTypes.func,
  edit: PropTypes.func,
  category: PropTypes.object,
};

export default AdminPostCard;
