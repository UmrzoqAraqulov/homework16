import { Fragment, useContext, useState } from "react";
import Loading from "../../components/loading/Loading";
import { Form, Input, Modal, Pagination, Select } from "antd";
import { IMG_URL, LIMITPAGE } from "../../const/const";
import AdminPostCard from "../../components/cards/AdminPostCard";
import {
  useAddNewPostImgMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetPostMutation,
  useGetPostsQuery,
} from "../../redux/services/postServices";
import { GeneralContextInfo } from "../../contexts/GeneralContext";

const AllPostsPage = () => {
  const { categoriesName } = useContext(GeneralContextInfo);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [categoryId,setCategoryId] = useState(categoriesName[0]?.value);

  const { data: posts, isLoading } = useGetPostsQuery({
    search,
    page,
    limit: LIMITPAGE,
  });

  const [addNewPostImg] = useAddNewPostImgMutation();
  const [deletePost] = useDeletePostMutation();
  const [editPost] = useEditPostMutation();
  const [getPost] = useGetPostMutation();

  const [imgObj, setimgObj] = useState(posts?.photo || { _id: "", name: "." });
  const [isModalopen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form] = Form.useForm();

  const onChange = (e) => {
    setPage(e);
  };

  const handleChange = (e) =>{
    setCategoryId(e);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    form.setFieldsValue({ name: "", description: "" });
    setimgObj({ _id: "", name: "." });
    setIsModalOpen(false);
  };

  const submit = async () => {
    const formData = await form.getFieldsValue();
    editPost({ body: { ...formData, photo: imgObj?._id,category:categoryId }, id: selected }).then(
      (res) => {
        console.log(res);
      }
    );

    setSelected(null);
    closeModal();
  };

  const deletePostQuestion = (id) => {
    let deleteQuestion = window.confirm("Do you want to launch this post?");
    if (deleteQuestion) {
      deletePost(id);
    }
  };

  const addImg = (e) => {
    let img = e.target.files[0];
    const form = new FormData();
    img && form.append("file", img);
    addNewPostImg(form).then((res) => {
      setimgObj(res.data);
    });
  };

  const edit = async (id) => {
    setSelected(id);
    try {
      const { data } = await getPost(id);
      form.setFieldsValue(data);
      setimgObj(data.photo);
    } finally {
      openModal();
    }
  };

  const changeSearch = (e) => {
    setSearch(e.target.value);
  };

  const validateMessages = {
    required: "Please fill this area!",
  };

  return (
    <div className=" w-11/12 mx-auto pb-4">
      <div className=" flex justify-between py-3">
        <h2 className="font-semibold text-2xl">Posts</h2>
        <input
          className="w-1/2 border rounded py-1 px-4"
          type="text"
          placeholder="Search..."
          onChange={changeSearch}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="flex flex-col gap-y-3">
            {posts?.data?.map((post) => (
              <AdminPostCard
                key={post?._id}
                {...post}
                deletePostQuestion={deletePostQuestion}
                edit={edit}
              />
            ))}
          </div>
          <div className="w-full text-center">
            <Pagination
              defaultCurrent={page}
              total={posts?.pagination?.total}
              pageSize={LIMITPAGE}
              onChange={onChange}
              showSizeChanger={false}
            />
          </div>
        </Fragment>
      )}
      <Modal
        title="Edit Post"
        open={isModalopen}
        onOk={submit}
        onCancel={closeModal}
        okText="Save"
      >
        <Form name="post" form={form} validateMessages={validateMessages}>
          <div className="flex flex-col items-center py-3 object-cover">
            <img
              src={IMG_URL + imgObj?._id + "." + imgObj?.name.split(".")[1]}
              alt=""
              className="w-24 h-28 border object-cover"
            />
            <input type="file" onChange={(e) => addImg(e)} />
          </div>
          <Form.Item name="title" rules={[{ required: true, min: 5, max: 50 }]}>
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{ required: true, min: 10, max: 500 }]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>

          <Form.Item name="tags" rules={[{ required: true }]}>
            <Input placeholder="Tags" />
          </Form.Item>
        </Form>
        <Select
          style={{
            width: 120,
          }}
          defaultValue={categoriesName[0]}
          onChange={handleChange}
          options={categoriesName}
        />
      </Modal>
    </div>
  );
};

export default AllPostsPage;
