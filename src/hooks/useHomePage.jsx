import { useCallback, useEffect, useState } from "react";
import { request } from "../server/request";

const useHomePage = () => {
  const [loading, setLoading] = useState(false);
  const [postsSliderLoading, setPostsSliderLoading] = useState(false);
  const [postOnes, setPostOnes] = useState([]);
  const [latestPost, setLatestPost] = useState({});

  const getLatestPost = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request("post/lastone");
      setLatestPost(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const getPostOnec = useCallback(async () => {
    try {
      setPostsSliderLoading(false);
      const { data } = await request("post/lastones");
      setPostOnes(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setPostsSliderLoading(false);
    }
  }, []);

  useEffect(() => {
    getPostOnec();
    getLatestPost();
  }, [getLatestPost, getPostOnec]);

  return {
    postOnes,
    latestPost,
    postsSliderLoading,
    loading,
  };
};

export default useHomePage;
