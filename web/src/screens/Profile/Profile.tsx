import { useContext, useEffect, useState } from "react";
import TabMenu from "./TabMenu";
import { ProfileContent } from "./ProfileContent";
// import { FavoritesContent } from "./FavoritesContent";
import { Button } from "../../components";
import { useTranslation } from "react-i18next";
import { EditModal } from "./EditModal";
import { AuthContext } from "../../contexts/AuthContext";
import { MyPromptsContent } from "./MyPromptsContent";
import { MyEarningsContent } from "./MyEarningsContent";

import { getMe } from "../../api/user";

import noavatar from "../../assets/noavatar.jpg";
import creator from "../../assets/creator.png";

export const Profile = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        updateUser(response);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileContent user={user} />;
      // case "favorites":
      //   return <FavoritesContent />;
      case "my-prompts":
        return <MyPromptsContent />;
      case "my-earnings":
        return <MyEarningsContent />;
    }
  };

  if (!user) return null;
  return (
    <div>
      {openModal && (
        <EditModal open={openModal} setOpen={setOpenModal} user={user} />
      )}
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="relative">
              {/* Creator badge */}
              {user.creator && (
                <img className="ml-4 absolute right-2" src={creator} alt="" />
              )}

              {/* Avatar */}
              {user.avatar ? (
                <img
                  className="w-20 h-20 rounded-full mr-4"
                  src={`${user.avatar}?${Date.now()}`}
                  alt=""
                />
              ) : (
                <img
                  className="w-20 h-20 rounded-full mr-4"
                  src={noavatar}
                  alt=""
                />
              )}
            </div>
            <p className="font-medium text-3xl">{user.name}</p>
          </div>
          <Button className="ml-auto" onClick={() => setOpenModal(true)}>
            {t("profile.editProfile")}
          </Button>
        </div>
        <div className="mt-4">
          <TabMenu activeTab={activeTab} onChangeTab={setActiveTab} />
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
