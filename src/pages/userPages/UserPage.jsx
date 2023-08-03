import useUser from "../../hooks/useUser";
import Loading from "../../components/loading/Loading";
import { Empty, Form, Input, Modal, Pagination, Popconfirm, Select } from "antd";
// import image from "../../assets/images/blogCard.png";
import { Fragment, useEffect } from "react";
import { IMG_URL, LIMITPAGE } from "../../const/const";
import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const UserPage = () => {
  const navigate = useNavigate();
  const {
    openModal,
    closeModal,
    editPost,page,
    searchMyPost,
    form,
    loading,
    myPosts,
    handleChange,
    submit,
    open,
    selected,
    setPage,
    total,
    photoModal,
    categoriesName,
    changeImg,
    getMyPosts,
  } = useUser();

  const onChange = (current) => {
    console.log(current);
    setPage(current);
  };

  useEffect(() => {
    getMyPosts();
  }, [getMyPosts]);

  const enterThisPost = (id) => {
    navigate(`/posts/${id}`);
  };

  const validateMessages = {
    required: "Please fill this area!",
  };
 

  return (
    <div className="containr pt-4">
      <div className="py-5 border-b-[1.5px] border-[#6D6E76] flex justify-between items-center">
        <h2 className="font-semibold text-xl sm:text-2xl">My posts</h2>
        <button onClick={openModal} className="py-2 px-5 bg-yellow-400">
          Add post
        </button>
      </div>
      <div>
        <input
          onChange={searchMyPost}
          placeholder="Search..."
          className="border-2 border-[#6D6E7680] outline-none py-2 px-5 my-4 w-full"
          type="text"
        />
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          myPosts?.length !== 0 && (
            <Fragment>
              <div>
                {myPosts?.map(
                  ({ category, title, description, _id, photo }) => (
                    <div
                      key={_id}
                      className="w-full border flex gap-5 sm:h-[300px] mt-5 max-[550px]:flex-col max-[550px]:w-3/4 mx-auto max-[450px]:w-full"
                    >
                      <img
                        className="w-1/2 h-[200px] sm:h-[300px] md:w-[400px]  object-cover object-top max-[550px]:w-full"
                        src={
                          IMG_URL + photo?._id + "." + photo.name?.split(".")[1]
                        }
                        alt=""
                      />
                      <div className="max-md:w-1/2 max-[550px]:w-full max-[550px]:px-4 pb-3">
                        <p className="text-[#592EA9] text-sm sm:text-base py-1 max-[550px]:py-0 max-[550px]:text-[10px]">
                          {category.name.toUpperCase()}
                        </p>
                        <h2
                          onClick={() => enterThisPost(_id)}
                          className=" cursor-pointer w-10/12 md:w-[700px] text-2xl sm:text-3xl text-[#232536] font-semibold pt-3 pb-7 max-[550px]:py-2"
                        >
                          {title}
                        </h2>
                        <p className="textPost text-sm sm:text-base text-[#6D6E76]">
                          {description}
                        </p>
                        <div className="flex w-full mt-5 text-white">
                          <div
                            onClick={() => editPost(_id)}
                            className="cursor-pointer border bg-green-500 text-2xl hover:bg-gray-400"
                          >
                            <EditOutlined style={{ padding: "8px 30px" }} />
                          </div>

                          <div className="cursor-pointer border text-xl hover:bg-gray-400 bg-red-600 sm:px-1 sm:py-2">
                            <Popconfirm
                              title="Title"
                              description="Are you sure to delete this Post?"
                              onConfirm={() => confirm(_id)}
                            >
                              <DeleteOutlined style={{ padding: "6px 24px" }} />
                            </Popconfirm>
                          </div>
                          <Link
                            to={`/posts/${_id}`}
                            className="cursor-pointer border items-center flex sm:py-2 sm:px-7 hover:bg-gray-400 bg-blue-600 py1 px-2"
                          >
                            More Info
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="text-center py-5">
                <Pagination
                  defaultCurrent={page}
                  total={total}
                  pageSize={LIMITPAGE}
                  onChange={onChange}
                  showSizeChanger={false}
                />
              </div>
            </Fragment>
          )
        )}
        {myPosts?.length === 0 && (
          <div
            style={{ height: "calc(100vh - 302px" }}
            className="flex justify-center items-center"
          >
            <Empty description="No Posts" />
          </div>
        )}
      </div>
      <div>
        <Modal
          title={(selected ? "Editing" : "Adding") + " Post"}
          open={open}
          onOk={submit}
          okText={selected ? "Save" : "Add"}
          onCancel={closeModal}
        >
          <div className="py-3 text-center">
            <img
              className="w-32 mx-auto mb-3 h-24 object-contain"
              src={
                IMG_URL + photoModal?._id + "." + photoModal.name?.split(".")[1]
              }
              alt="Choose Img"
            />
            <input onChange={changeImg} type="file" placeholder="Img File" />
          </div>
          <Form
            form={form}
            name="modalForm"
            validateMessages={validateMessages}
          >
            <Form.Item
              name="title"
              rules={[{ required: true, min: 5, max: 50 }]}
            >
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
    </div>
  );
};

export default UserPage;
