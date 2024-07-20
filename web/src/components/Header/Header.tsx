import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { NavbarLink } from "./NavbarLink";
import { ToggleMenuButton } from "./ToggleMenuButton";
import { DropdownMenu } from "./DropdownMenu";
import logo from "../../assets/logo.png";

export const Header = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const verifyEmailWhiteListRoutes = () => {
    const whiteListRoutes = [
      "/login",
      "/register",
      "/forgot-password",
      "/how-it-works",
      "/become-creator",
      "/validate-email",
    ];

    return whiteListRoutes.some(
      (route) =>
        window.location.pathname === route ||
        window.location.pathname.startsWith(`${route}/`)
    );
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-6 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img src={logo} className="mr-3 w-12" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              The Prompt Market
            </span>
          </Link>
          <div className="flex items-center lg:order-2 gap-2">
            {user ? (
              <>
                <DropdownMenu />
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
      {user && !verifyEmailWhiteListRoutes() && !user.verified && (
        <div
          className="m-8 p-6 mb-4 text-yellow-900 rounded-lg bg-yellow-200 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <span className="font-medium">{t("header.needVerification")}</span>{" "}
          {t("header.needVerificationText")}
          <br />
          <Link
            to={`/validate-email/${user.email}`}
            className="underline text-blue-600"
          >
            {t("header.needVerificationLink")}
          </Link>
        </div>
      )}
    </header>
  );
};
