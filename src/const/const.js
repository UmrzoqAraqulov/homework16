import Cookies from "js-cookie";

export const CATEGORYID = "categoryId";
export const LIMITPAGE = 6;
export const TOKEN="token";
export const ROLE = "role";
export const EXPIRE = "expire";
export const API = "https://blog-backend-production-a0a8.up.railway.app/";
export const ENDPOINT = API+"api/v1/";
export const IMG_URL = API + "upload/"

export const logOut = () =>{
    Cookies.remove(ROLE);
    Cookies.remove(TOKEN);
    Cookies.remove(EXPIRE);
}