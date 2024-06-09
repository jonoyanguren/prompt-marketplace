import { useEffect, useState } from "react";
import { getMe } from "../../api/user";
import { User } from "../../types";
import TabMenu from "./TabMenu";
import { ProfileContent } from "./ProfileContent";
import { FavoritesContent } from "./FavoritesContent";
import { Button } from "../../components";
import { useTranslation } from "react-i18next";
import { EditModal } from "./EditModal";

export const Profile = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [openModal, setOpenModal] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileContent user={user} />;
      case "favorites":
        return <FavoritesContent />;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    fetchUser();
  }, []);

  if (!user) return null;
  return (
    <>
      {openModal && (
        <EditModal open={openModal} setOpen={setOpenModal} user={user} />
      )}
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex items-center">
            <img
              className="w-20 h-20 rounded-full mr-4"
              src={user.avatar}
              alt=""
            />
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
    </>
  );
};
