import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from "react";
import { request } from "../server/request";
import Cookies from "js-cookie";
import { EXPIRE, ROLE, TOKEN } from "../const/const";

export const GeneralContextInfo = createContext();

const GeneralContext = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get(TOKEN) && Cookies.get(EXPIRE)>= Date.now() ? true : false
  );
  const [role, setRole] = useState(Cookies.get(ROLE) || null);

 const [categorySliderLoading, setCategorySliderLoading] = useState(false);
  const [categoryOnec, setCategoryOnec] = useState([]);
const [categoriesName, setCategoriesName] = useState([]);

  const getCategoryOnes = useCallback(async () => {
    try {
      setCategorySliderLoading(true);
      const { data } = await request("category");
      let arr = data?.data?.map((el) => {return{value: el._id, label: el.name}});
      setCategoriesName(arr);
      setCategoryOnec(data.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setCategorySliderLoading(false);
    }
  }, []);

  useEffect(()=>{
    getCategoryOnes();
  },[getCategoryOnes])
  const state = {
    categorySliderLoading,
    categoryOnec,
    categoriesName,
    isAuthenticated,
    setIsAuthenticated,
    role,
    setRole,
  };
  return (
    <GeneralContextInfo.Provider value={state}>
      {children}
    </GeneralContextInfo.Provider>
  );
};

GeneralContext.propTypes = {
  children: PropTypes.element,
};

export default GeneralContext;
