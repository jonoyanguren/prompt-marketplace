import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { NavbarLink } from "./NavbarLink";
import { ToggleMenuButton } from "./ToggleMenuButton";
import { Button } from "../Button";

export const Header = () => {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-6 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </Link>
          <div className="flex items-center lg:order-2 gap-2">
            {user ? (
              <>
                <Link to="/profile">
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                </Link>
                <Button onClick={logout}>{t("header.logout")}</Button>
                <ToggleMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
              </>
            ) : (
              <>
                <NavbarLink href="/login" text={t("header.login")} />
                <NavbarLink href="/register" text={t("header.register")} />
                <ToggleMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
              </>
            )}
          </div>
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <div
              className={`
                ${isOpen && "w-full"}
                flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0
              `}
            >
              <NavbarLink href="/" text={t("header.home")} />
              <NavbarLink href="/platforms" text={t("header.platforms")} />
              <NavbarLink href="/how-it-works" text={t("header.howItWorks")} />
              <NavbarLink
                href="/become-creator"
                text={t("header.becomeCreator")}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
