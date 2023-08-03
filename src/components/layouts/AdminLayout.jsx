import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  AlignCenterOutlined,
  UserOutlined,
  UserAddOutlined,
  FileTextOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

<UserAddOutlined />;
<UsergroupAddOutlined />;

import { Layout, Menu, Button } from "antd";
import { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { logOut } from "../../const/const";
import { GeneralContextInfo } from "../../contexts/GeneralContext";
const { Sider, Content } = Layout;

const AdminLayout = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [path, setPath] = useState(pathname);
  const {setIsAuthenticated} = useContext(GeneralContextInfo);

  const logOutAdmin = () => {
    const check = window.confirm("Do you want to log out of this account?");
    if (check) {
      logOut();
      setIsAuthenticated(false);
    }
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "18px",
            color: "white",
            margin: "0px 0px 10px 25px",
            width: 30,
          }}
        />
        <Menu
          theme={"dark"}
          mode="inline"
          selectedKeys={[path]}
          onClick={({ key }) => {
            setPath(key);
          }}
          items={[
            {
              key: "/dashboard",
              icon: <AlignCenterOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/admin-account",
              icon: <UserOutlined />,
              label: <Link to="/admin-account">Admin</Link>,
            },
            {
              key: "/users",
              icon: <TeamOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              key: "/categories",
              icon: <DatabaseOutlined />,
              label: <Link to="/categories">Categories</Link>,
            },
            {
              key: "/all-posts",
              icon: <FileTextOutlined />,
              label: <Link to="/all-posts">Posts</Link>,
            },
          ]}
        />
        <button
          onClick={logOutAdmin}
          className="w-full text-white py-1 hover:bg-white hover:text-gray-700 my-2"
        >
          LogOut
        </button>
      </Sider>
      <Layout>
        {/* <Header
          style={{
            padding: 0,
            display: "flex",
            alignItems: "center",
            background: colorBgContainer,
          }}></Header> */}

        <Content>
          <div className="bg-white">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
