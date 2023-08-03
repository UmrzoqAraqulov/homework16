import UserNav from "../navs/UserNav";
import { Outlet } from "react-router-dom";
import UserFooter from "../footers/UserFooter";

const UserLayout = () => {
  return (
    <div>
      <nav className="bg-[#232536] fixed top-0 shadow-sm w-full text-white">
        <UserNav />
      </nav>
      <main className="pt-10">
        <Outlet />  
      </main>
      <footer className="bg-[#232536] z-10 border-t border-[#965ce4] w-full py-4">
        <UserFooter />
      </footer>
    </div>
  );
};

export default UserLayout;
