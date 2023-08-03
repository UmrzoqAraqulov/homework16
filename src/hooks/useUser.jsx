import { LIMITPAGE } from "../const/const";
import { Form } from "antd";
import { useCallback, useContext , useState } from "react";
import { GeneralContextInfo } from "../contexts/GeneralContext";
import { request } from "../server/request";

const useUser = () => {
  const { categoriesName } = useContext(GeneralContextInfo);

  const [form] = Form.useForm();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(1);
  const [myPosts, setMyPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [categoryId, setCategoryId] = useState(categoriesName[0]?.value);
  const [imgId, setImgId] = useState("");
  const [photoModal, setPhotoModal] = useState({});

  const changeImg = async (e) => {
    let img = e.target.files[0];
    let form = new FormData();
    img && form.append("file", img);
    try {
      const { data } = img && (await request.post("upload", form));
      setPhotoModal(data);
      setImgId(data?._id);
    } catch (err) {
      console.log(err.message);
    }
  };

  const openModal = () => {
    setOpen(true);
    !selected ? setCategoryId(categoriesName[0]?.value) : setCategoryId();
  };

  const closeModal = () => {
    form.resetFields();
    setImgId("");
    setPhotoModal({});
    setOpen(false);
  };

  const getMyPosts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request(
        `post/user?page=${page}&limit=${LIMITPAGE}&search=${search}`
      );
      setMyPosts(data.data);
      setTotal(data.pagination.total);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  

  const searchMyPost = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (value) => {
    setCategoryId(value);
    console.log(value);
  };

  const submit = async () => {
    let result = await form.validateFields();
    result = {
      ...result,
      tags: result.tags.split(","),
      category: categoryId,
      photo: imgId,
    };
    if (!selected) {
      console.log(result);
      try {
        await request.post("post", result);
      } finally {
        getMyPosts();
      }
    } else {
      try {
        await request.put(`post/${selected}`, result);
      } finally {
        getMyPosts();
      }
    }
    closeModal();
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const editPost = async (id) => {
    setSelected(id);
    openModal();
    try {
      const { data } = await request(`post/${id}`);
      console.log(data);
      let { tags, title, description, category, photo } = data;
      console.log(photo);
      tags = tags.join(",");
      form.setFieldsValue({ title, description, tags });
      setCategoryId(category);
      setImgId(photo._id);
      setPhotoModal(photo)
    } catch (err) {
      console.log(err.message);
    }
  };

  const deletePost = async (id) => {
    try {
      await request.delete(`post/${id}`);
    } finally {
      getMyPosts();
    }
  };

  return {
    handleChange,
    openModal,
    setPage,
    onPreview,
    changeImg,page,
    closeModal,
    editPost,
    deletePost,
    searchMyPost,photoModal,
    getMyPosts,
    form,
    open,
    submit,
    myPosts,setMyPosts,
    total,
    setOpen,
    loading,
    categoriesName,
  };
};

export default useUser;
