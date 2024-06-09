import { useContext } from "react";
import { Title } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

export const FavoritesContent = () => {
  console.log("FAVORITES");

  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  console.log("user", user);

  return (
    <div className="text-left text-gray-500 mt-12">
      <Title>Favorites</Title>
    </div>
  );
};
