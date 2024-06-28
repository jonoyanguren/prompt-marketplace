import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

import { AuthContext } from "../../contexts/AuthContext";

import { FaRegUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Button } from "../Button";
import { OutsideClick } from "../OutsideClick";

import noavatar from "../../assets/noavatar.jpg";
const menuItems = [
  { name: t("dropdownMenu.profile"), href: "/profile", icon: <FaRegUser /> },
  {
    name: t("dropdownMenu.myOrders"),
    href: "/my-orders",
    icon: <MdOutlineShoppingCart />,
  },
];
export const DropdownMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const goTo = (url: string) => {
    setIsOpen(false);
    navigate(url);
  };

  if (!user) return null;

  return (
    <div className="relative inline-block text-left">
      {user.avatar ? (
        <img
          src={`${user.avatar}?${Date.now()}`}
          onClick={toggleDropdown}
          alt="Avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
      ) : (
        <img
          src={noavatar}
          onClick={toggleDropdown}
          className="w-10 h-10 rounded-full mr-4"
        />
      )}
      {isOpen && (
        <OutsideClick onOutsideClick={() => setIsOpen(false)}>
          <div className="z-10 right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute">
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              {menuItems.map((item) => (
                <li key={item.name} className="flex items-center pl-4">
                  {item.icon}
                  <Button
                    link
                    onClick={() => goTo(item.href)}
                    className="block p-2"
                  >
                    <span className="text-gray-700">{item.name}</span>
                  </Button>
                </li>
              ))}
              <hr />

              <li className="flex items-center pl-4 text-red-600">
                <FaRegUser />
                <Button
                  link
                  onClick={() => logout()}
                  className="p-2 text-red-600 hover:no-underline "
                >
                  {t("dropdownMenu.logout")}
                </Button>
              </li>
            </ul>
          </div>
        </OutsideClick>
      )}
    </div>
  );
};
