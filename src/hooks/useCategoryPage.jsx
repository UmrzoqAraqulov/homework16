import { useCallback, useEffect, useState } from "react";
import { request } from "../server/request";
import { LIMITPAGE } from "../const/const";
import { useParams } from "react-router-dom";

const useCategoryPage = () => {
  let { id } = useParams();
  const [categoryId, setCategoryId] = useState(id);
  const [category, setCategory] = useState({});
  const [postsInCategory, setPostsInCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);

  const handleChange = (e) => {
    setCategoryId(e);
    console.log(e);
    getCategory(e);
  };

  const getCategory = useCallback(async () => {
    try {
      setLoading(true);
      console.log(categoryId);
      const { data } = await request(`category/${categoryId}`);
      setCategory(data);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  const getPostsInCategory = useCallback(async () => {
    try {
      setPostsLoading(true);
      const { data } = await request(
        `post?page=${page}&limit=${LIMITPAGE}&search=${search}&category=${categoryId}`
      );
      setPostsInCategory(data.data);
      setTotal(data.pagination.total);
    } finally {
      setPostsLoading(false);
    }
  }, [categoryId, page, search]);

  useEffect(() => {
    getCategory();
    getPostsInCategory();
  }, [getCategory, getPostsInCategory, id]);

  return {
    category,
    postsInCategory,
    handleChange,
    setPage,
    setSearch,
    total,
    postsLoading,
    loading,
    page,
    id,
  };
};

export default useCategoryPage;
