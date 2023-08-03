import { Fragment, useState } from "react";
import {
  useAddCategoryMutation,
  useAddNewCategoryImgMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryMutation,
} from "../../redux/services/categoryServices";
import Loading from "../../components/loading/Loading";
import AdminCategoryCard from "../../components/cards/AdminCategoryCard";
import { Form, Input, Modal, Pagination } from "antd";
import { IMG_URL, LIMITPAGE } from "../../const/const";

const CategoriesPage = () => {
  const [page, setPage] = useState(1);

  const { data: categories, isLoading } = useGetCategoriesQuery({page,limit:LIMITPAGE});
  const [addNewCategoryImg] = useAddNewCategoryImgMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const [getCategory] = useGetCategoryMutation();

  const [imgObj, setimgObj] = useState(
    categories?.photo || { _id: "", name: "." }
  );
  const [isModalopen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form] = Form.useForm();

   const onChange = (e) => {
     setPage(e);
   };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    form.setFieldsValue({ name: "", description: "" });
    setimgObj({ _id: "", name: "." });
    setIsModalOpen(false);
  };

  const submit = async () => {
    if (!selected) {
      const formData = await form.getFieldsValue();
      addCategory({ ...formData, photo: imgObj }).then((res) => {
        console.log(res);
      });
    } else {
      const formData = await form.getFieldsValue();
      editCategory({ body: { ...formData, photo: imgObj }, id: selected }).then(
        (res) => {
          console.log(res);
        }
      );
    }
    setSelected(null);
    closeModal();
  };

  const deleteCategoryQuestion = (id) => {
    let deleteQuestion = window.confirm("Do you want to launch this category?");
    if (deleteQuestion) {
      deleteCategory(id);
    }
  };

  const addImg = (e) => {
    let img = e.target.files[0];
    const form = new FormData();
    img && form.append("file", img);
    addNewCategoryImg(form).then((res) => {
      setimgObj(res.data);
    });
  };

  const edit = async (id) => {
    setSelected(id);
    try {
      const { data } = await getCategory(id);
      form.setFieldsValue(data);
      setimgObj(data.photo);
    } finally {
      openModal();
    }
  };

  return (
    <div className=" w-11/12 mx-auto pb-4">
      <div className=" flex justify-between py-3">
        <h2 className="font-semibold text-2xl max-[500px]:hidden">
          Categories
        </h2>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white py-1 px-2 rounded"
        >
          Add Category
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="grid grid-cols-3 gap-y-3 py-4 gap-x-2 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
            {categories?.data?.map((category) => (
            <AdminCategoryCard
              key={category?._id}
              {...category}
              deleteCategoryQuestion={deleteCategoryQuestion}
              edit={edit}
            />
          ))}
          </div>
          <div className="w-full text-center">
            <Pagination
              defaultCurrent={page}
              total={categories?.pagination?.total}
              pageSize={LIMITPAGE}
              onChange={onChange}
              showSizeChanger={false}
            />
          </div>
        </Fragment>
      )}
      <Modal
        title={selected ? "Edit Category" : "Add Category"}
        open={isModalopen}
        onOk={submit}
        onCancel={closeModal}
        okText={selected ? "Save" : "Add"}
      >
        <Form name="category" form={form}>
          <div className="flex flex-col items-center py-3 object-cover">
            <img
              src={IMG_URL + imgObj?._id + "." + imgObj?.name.split(".")[1]}
              alt=""
              className="w-24 h-28 border object-cover"
            />
            <input type="file" onChange={(e) => addImg(e)} />
          </div>
          <Form.Item name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="description">
            <Input placeholder="description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
