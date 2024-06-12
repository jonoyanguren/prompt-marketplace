import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { AiOutlineUser, AiFillHeart } from "react-icons/ai";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";

const tabs = [
  {
    code: "profile",
    text: i18n.t("profile.profileMenu"),
    icon: <AiOutlineUser className="w-5 h-5 mr-1" />,
  },
  {
    code: "favorites",
    text: i18n.t("profile.favoritesMenu"),
    icon: <AiFillHeart className="w-5 h-5 mr-1" />,
  },
  {
    code: "my-prompts",
    text: i18n.t("profile.myPromptsMenu"),
    icon: <BsFillChatLeftTextFill className="w-4 h-4 mr-1" />,
  },
  {
    code: "my-earnings",
    text: i18n.t("profile.myEarningsMenu"),
    icon: <GiReceiveMoney className="w-4 h-4 mr-1" />,
  },
];

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
        {tabs.map((tab) => (
          <TabItem
            key={tab.code}
            text={tab.text}
            isActive={activeTab === tab.code}
            icon={tab.icon}
            onChangeTab={() => onChangeTab(tab.code)}
          />
        ))}
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
