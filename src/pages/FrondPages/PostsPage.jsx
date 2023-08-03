import { Fragment, useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { request } from "../../server/request";
import { LIMITPAGE } from "../../const/const";
import PostCard from "../../components/cards/PostCard";
import Loading from "../../components/loading/Loading";
import { Empty, Pagination } from "antd";

const PostsPage = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request(
        `post?page=${page}&limit=${LIMITPAGE}&search=${search}`
      );
      setPosts(data.data);
      setTotal(data.pagination.total);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const searchPost = (e) => {
    setSearch(e.target.value);
  };

  const onChange = (current) => {
    setPage(current);
  };
  return (
    <div className="pt-10 containr">
      <div>
        <input
          onChange={searchPost}
          className="w-full outline-none border-2 py-2 px-5 my-4"
          placeholder="Search..."
          type="text"
        />
      </div>
      <h2 className="py-6 border-b border-[#6D6E76] text-3xl sm:text-4xl font-bold">
        All posts
      </h2>
      <div className="mb-5">
        {loading ? (
          <Loading />
        ) : (
          posts?.length !== 0 && (
            <Fragment>
              <div>
                {posts?.map((el) => (
                  <PostCard key={el._id} el={el} />
                ))}
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
        {posts?.length === 0 && (
          <div
            style={{ height: "calc(100vh - 361px" }}
            className="flex justify-center items-center"
          >
            <Empty description="No Posts" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsPage;
