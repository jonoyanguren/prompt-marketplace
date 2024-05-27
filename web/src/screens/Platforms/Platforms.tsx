import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Platform } from "../../types";
import { Title } from "../../components";
import { getPlatforms } from "../../api/platforms";
import { PlatformItem } from "./PlatformItem";

export const Platforms = () => {
  const { t } = useTranslation();

  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        setLoading(true);
        const data = await getPlatforms();
        setPlatforms(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las plataformas:", error);
      }
    };

    fetchPlatforms();
  }, []);

  return (
    <div>
      <Title>{t("platforms.title")}</Title>

      {loading && (
        <div>
          <p>Loading...</p>
        </div>
      )}

      <div className="mt-12">
        {platforms.map((platform) => (
          <PlatformItem key={platform._id} platform={platform} />
        ))}
      </div>
    </div>
  );
};
