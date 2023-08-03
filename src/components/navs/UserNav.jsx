import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GeneralContextInfo } from "../../contexts/GeneralContext";
import { logOut } from "../../const/const";
import useUser from "../../hooks/useUser";

const UserNav = () => {
  const { isAuthenticated, setIsAuthenticated } =
    useContext(GeneralContextInfo);
    const {setMyPosts} = useUser();
  const [navBar, setNavBar] = useState(false);
  const navBarStyle =
    "flex gap-5 flex-col fixed w-1/2 h-screen bg-[#232536] text-xl sm:text-lg z-30 items-center pt-24 sm:p-0 top-0 sm:flex-row sm:w-auto sm:h-auto sm:relative sm:left-0";

  const navBarShow = () => {
    setNavBar(!navBar);
  };

  const logOutUser = () => {
    const check = window.confirm("Do you want to log out of this account?");
    if(check){
      setMyPosts([]);
      logOut();
      setIsAuthenticated(false);      
    }
  };

  return (
    <div className="containr flex justify-between items-center py-3">
      <div className="text-2xl font-semibold">
        {isAuthenticated ? (
          <Link to="/my-blog">MyBlog</Link>
        ) : (
          <Link to="/">NajotNews</Link>
        )}
      </div>
      <div className="flex gap-3 sm:gap-8 items-center">
        <ul
          style={{ transition: "0.5s" }}
          className={
            navBar ? navBarStyle + " left-0" : navBarStyle + " -left-full"
          }
        >
          <li>
            <NavLink
              className="py-3 hover:border-blue-500 hover:text-blue-500"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="py-3 hover:border-blue-500 hover:text-blue-500"
              to="/posts"
            >
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              className="py-3 hover:border-blue-500 hover:text-blue-500"
              to="/about"
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              className="py-3 hover:border-blue-500 hover:text-blue-500"
              to="/register"
            >
              Register
            </NavLink>
          </li>
          <li>
            <Link
              className="text-[#232536] hover:text-white text-base sm:text-lg bg-white py-2 px-5 border border-white hover:bg-[#232536]"
              to={isAuthenticated ? "/account" : "/login"}
            >
              {isAuthenticated?"Account":"Login"}
            </Link>
          </li>
          <i
            onClick={navBarShow}
            className="fa-solid fa-xmark text-2xl absolute top-3 right-3 cursor-pointer sm:hidden"
          ></i>
        </ul>
        {isAuthenticated&&<i
          onClick={logOutUser}
          className="fa-solid fa-right-from-bracket text-[21px] text-white cursor-pointer"
        ></i>}
        <i
          onClick={navBarShow}
          className="fa-solid fa-bars text-2xl cursor-pointer sm:hidden"
        ></i>
      </div>
    </div>
  );
};

export default UserNav;
