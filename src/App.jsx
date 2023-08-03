import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { GeneralContextInfo } from "./contexts/GeneralContext";

import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/layouts/AdminLayout";

import UserPage from "./pages/userPages/UserPage";
import HomePage from "./pages/FrondPages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/FrondPages/AboutPage";
import CategoryPage from "./pages/FrondPages/CategoryPage";
import PostsPage from "./pages/FrondPages/PostsPage";
import PostPage from "./pages/FrondPages/PostPage";
import RegisterPage from "./pages/FrondPages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";

import UsersPage from "./pages/adminPages/UsersPage";
import CategoriesPage from "./pages/adminPages/CategoriesPage";
import AllPostsPage from "./pages/adminPages/AllPostsPage";
import DashboardPage from "./pages/adminPages/DashboardPage";

const App = () => {
  const { isAuthenticated, role } = useContext(GeneralContextInfo);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="account"
            element={
              isAuthenticated && role === "user" ? (
                <AccountPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="my-blog"
            element={
              isAuthenticated && role === "user" ? (
                <UserPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        {isAuthenticated && role === "admin" && (
          <Route path="/" element={<AdminLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin-account" element={<AccountPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/all-posts" element={<AllPostsPage />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
