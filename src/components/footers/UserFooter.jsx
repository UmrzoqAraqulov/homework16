import { Link } from "react-router-dom";

const UserFooter = () => {
  return (
    <div className=" containr items-center flex justify-between sm:flex-row flex-col gap-2">
      <p className="text-white sm:order-1 order-2 sm:w-72 text-center sm:text-left">
        Finstreet 118 2561 Fintown Hello@finsweet.com 020 7993 2905
      </p>
      <div className="text-[#6D6E76] flex gap-4 text-xl sm:order-2 order-1 ">
        <Link to="https://www.facebook.com" target="_blank">
          <i className="fa-brands cursor-pointer hover:text-blue-800 fa-facebook"></i>
        </Link>
        <Link target="_blank" to="https://twitter.com">
          <i className="fa-brands cursor-pointer hover:text-blue-500 fa-twitter"></i>
        </Link>
        <Link target="_blank" to="https://www.instagram.com/">
          <i className="fa-brands cursor-pointer hover:text-pink-500 fa-instagram"></i>
        </Link>
        <Link target="_blank" to="https://ru.linkedin.com/">
          <i className="fa-brands cursor-pointer hover:text-white fa-linkedin-in"></i>
        </Link>
      </div>
    </div>
  );
}

export default UserFooter