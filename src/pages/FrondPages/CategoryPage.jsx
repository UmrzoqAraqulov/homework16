import { Fragment, useContext } from "react";
import PostCard from "../../components/cards/PostCard";
import { Empty, Pagination, Select } from "antd";
import { LIMITPAGE } from "../../const/const";
import Loading from "../../components/loading/Loading";
import useCategoryPage from "../../hooks/useCategoryPage";
import { GeneralContextInfo } from "../../contexts/GeneralContext";

const CategoryPage = () => {
  const { categoriesName } = useContext(GeneralContextInfo);
  const {
    category,
    handleChange,
    postsInCategory,
    setSearch,
    total,
    setPage,
    loading,
    postsLoading,
    page
  } = useCategoryPage();

  const changeInput = (e) => {
    setSearch(e.target.value);
  };

  const onChange = (current) => {
    setPage(current);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <header className="bg-[#F4F0F8] py-14 text-center">
          <h2 className="sm:text-4xl text-3xl font-bold pb-2">
            {category?.name}
          </h2>
          <p className="text-[#6D6E76] text-sm sm:text-base containr">
            {category?.description}
          </p>
          <p className="text-[#232536] text-sm sm:text-base font-semibold pt-3">
            BLOG {">"}{" "}
            <Select
              style={{
                width: 120,
                fontSize: "30px !important",
              }}
              defaultValue={{label:category?.name,value:category?._id }}
              onChange={handleChange}
              options={categoriesName}
            />
          </p>
        </header>
      )}

      <section className="py-6 containr">
        <div className="mb-5">
          <input
            className="w-full border-2 outline-none py-2 px-5"
            placeholder="Search..."
            onChange={changeInput}
            type="text"
          />
        </div>
        {postsLoading ? (
          <Loading />
        ) : (
          postsInCategory?.length !== 0 && (
            <Fragment>
              <div>
                {postsInCategory?.map((el) => (
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
        {postsInCategory?.length === 0 && (
          <div
            style={{ height: "calc(100vh - 302px" }}
            className="flex justify-center items-center"
          >
            <Empty description="No Posts" />
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;
