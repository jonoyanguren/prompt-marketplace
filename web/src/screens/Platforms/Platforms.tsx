import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Platform } from "../../types";
import { Input, Title } from "../../components";
import { getPlatforms } from "../../api/platforms";
import { PlatformItem } from "./PlatformItem";

import empty from "../../assets/empty.png";

export const Platforms = () => {
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState<string>("");
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        setLoading(true);
        const data = await getPlatforms();
        setPlatforms(data);
        setFilteredPlatforms(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las plataformas:", error);
      }
    };

    fetchPlatforms();
  }, []);

  useEffect(() => {
    setFilteredPlatforms(
      platforms.filter((platform) =>
        platform.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, platforms]);

  return (
    <div>
      <Title>{t("platforms.title")}</Title>

      {loading && (
        <div>
          <p>Loading...</p>
        </div>
      )}

      <div className="mt-12">
        <Input
          name={""}
          placeholder={t("platforms.search")!}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {filteredPlatforms.length === 0 && (
        <div className="mt-12 w-2/3 m-auto bg-white rounded-xl shadow-lg p-8">
          <img src={empty} className="w-52 h-52 m-auto" />
          <p className="mt-6 mb-2 text-xl">{t("platforms.noResultsTitle")}</p>
          <p className="text-gray-500">{t("platforms.noResultsText")}</p>
        </div>
      )}

      <div className="mt-12">
        {filteredPlatforms.map((platform) => (
          <PlatformItem key={platform._id} platform={platform} />
        ))}
      </div>
    </div>
  );
};
