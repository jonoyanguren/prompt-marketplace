import { HeartIcon } from "../../assets/icons/profile/Heart";
import { ProfileIcon } from "../../assets/icons/profile/Profile";
import { useTranslation } from "react-i18next";

const TabMenu = ({
  activeTab,
  onChangeTab,
}: {
  activeTab: string;
  onChangeTab: (value: string) => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <TabItem
          text={t("profile.profileMenu")}
          isActive={activeTab === "profile"}
          icon={<ProfileIcon />}
          onChangeTab={() => onChangeTab("profile")}
        />
        <TabItem
          text={t("profile.favoritesMenu")}
          isActive={activeTab === "favorites"}
          icon={<HeartIcon />}
          onChangeTab={() => onChangeTab("favorites")}
        />
      </ul>
    </div>
  );
};

const TabItem = ({
  text,
  isActive,
  icon,
  onChangeTab,
}: {
  text: string;
  isActive: boolean;
  icon?: React.ReactNode;
  onChangeTab: () => void;
}) => {
  return (
    <li className="me-2">
      <button
        onClick={() => onChangeTab()}
        className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${
          isActive
            ? "text-indigo-600 border-indigo-600 dark:text-indigo-500 dark:border-indigo-500"
            : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
        } group`}
      >
        {icon}
        {text}
      </button>
    </li>
  );
};

export default TabMenu;
