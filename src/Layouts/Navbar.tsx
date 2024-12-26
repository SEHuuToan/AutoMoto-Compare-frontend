import React, { useState, useEffect } from "react";
import {
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation  } from "react-router-dom";
import {Layout, Menu, Image, Button} from "antd";
import type { MenuProps } from "antd";
import navbarLogo from "../assets/navbarLogo3.jpg";
import navbarUserLogo from "../assets/normalUser.svg";
const { Header } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
const menuItems: MenuItem[] = [
  {
    label: "Model",
    key: "model",
  },
  {
    label: "Experiences",
    key: "experience",
  },
  {
    label: "Service - Support",
    key: "service-support",
  },
];
const Navbar:React.FC = () => {
  const location = useLocation();
  const storedSelectedKey = localStorage.getItem("selectedKey") || "";
  const [currentSelectedKey, setCurrentSelectedKey] = useState(storedSelectedKey);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 640;
      setIsDesktop(window.innerWidth >= 640);
      setIsDesktop(isNowDesktop);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentSelectedKey("home");
      localStorage.setItem("selectedKey", "home");
    }
  }, [location]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onClickMenu: MenuProps["onClick"] = (e) => {
    setCurrentSelectedKey(e.key);
    localStorage.setItem("selectedKey", e.key);
    setMenuVisible(false); 
    navigate(`/${e.key}`);
  };
  const onClickLogo = () => {
    setCurrentSelectedKey("home");
    localStorage.setItem("selectedKey", "home");
    navigate("/");
  };

  return (
    <Header className="flex items-center justify-between px-4 bg-black">
     {!isDesktop && (
        <div className="relative">
          <Button type="primary" onClick={toggleMenu} className="mr-2">
            <MenuUnfoldOutlined />
          </Button>
          {menuVisible && (
            <div className="absolute left-0 top-full bg-gray-800 shadow-lg rounded-md z-50">
              <Menu 
                mode="horizontal"
                selectedKeys={[currentSelectedKey]}
                items={menuItems}
                onClick={onClickMenu}
                style={{ textDecoration: "none" }}
              />
            </div>
          )}
        </div>
      )}
      <div className="hidden sm:flex items-center gap-5">
        <Image
          className="hidden sm:block cursor-pointer"
          preview={false}
          height={50}
          src={navbarLogo}
          onClick={onClickLogo}
        />
        {isDesktop && (
          <div className="flex">
            <Menu
              className="w-[315px]"
              mode="horizontal"
              theme="dark"
              selectedKeys={[currentSelectedKey]}
              items={menuItems}
              onClick={onClickMenu}
            />
          </div>
        )}
      </div>
      <div className="flex items-center">
        <Image
          preview={false}
          width={50}
          height={50}
          src={navbarUserLogo}
        />
      </div>
    </Header>
  );
};

export default Navbar;
