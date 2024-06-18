import { useContext } from "react";
import { Title } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

export const FavoritesContent = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  return (
    <div className="text-left text-gray-500 mt-12">
      <Title>Favorites</Title>
    </div>
  );
};
