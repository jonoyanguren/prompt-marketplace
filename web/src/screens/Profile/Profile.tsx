import { useEffect, useState } from "react";
import { getMe } from "../../api/user";
import { User } from "../../types";
import TabMenu from "./TabMenu";
import { ProfileContent } from "./ProfileContent";
import { FavoritesContent } from "./FavoritesContent";

export const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileContent />;
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
    <div className="p-6">
      <div className="flex items-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full mr-8"></div>
        <p className="font-medium text-3xl">{user.name}</p>
      </div>
      <div>
        <TabMenu activeTab={activeTab} onChangeTab={setActiveTab} />
        {renderContent()}
      </div>
    </div>
  );
};
