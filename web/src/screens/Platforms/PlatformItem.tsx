import { enqueueSnackbar } from "notistack";
import { votePlatform } from "../../api/platforms";
import { API_URL } from "../../conf";
import { Platform } from "../../types";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const PlatformItem = ({ platform }: { platform: Platform }) => {
  const { t } = useTranslation();
  const [votes, setVotes] = useState<number>(platform.votes);
  const [userHasUpvoted, setUserHasUpvoted] = useState<boolean | undefined>(
    platform.userHasUpvoted
  );
  const doVotePlatform = async (id: string) => {
    try {
      await votePlatform({ id });
      setVotes(platform.votes + 1);
      setUserHasUpvoted(true);
      enqueueSnackbar(t("platforms.upvoteSnack"), {
        variant: "success",
      });
    } catch (e) {
      console.error("Error al votar plataforma", e);
    }
  };

  return (
    <div className="mb-4 p-6 rounded-xl shadow-lg bg-white text-left flex justify-between">
      <div className="flex">
        <img
          className="w-16 h-16 rounded-md"
          src={`${API_URL}/${platform.logo}`}
          alt={platform.name}
        />
        <div className="mx-8">
          <p className="font-bold text-lg text-gray-900">{platform.name}</p>
          <a
            href={platform.url}
            target="_blank"
            className="text-sm my-2 underline text-gray-800"
          >
            {platform.url}
          </a>
          <p>{platform.description}</p>
        </div>
      </div>
      <div
        className={`border min-w-16 h-16 flex flex-col justify-center items-center rounded-md ${
          userHasUpvoted
            ? "bg-green-50 border-green-200"
            : "bg-gray-50 border-gray-200 cursor-pointer"
        }`}
        onClick={() => {
          if (userHasUpvoted) return;
          doVotePlatform(platform._id);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M18.7591 13.208L10.984 4.61696C10.723 4.32864 10.3691 4.16667 9.99998 4.16667C9.6309 4.16667 9.27693 4.32864 9.01592 4.61696L1.24084 13.208C1.04624 13.4231 0.913724 13.6971 0.860042 13.9954C0.80636 14.2937 0.833924 14.6029 0.939248 14.8839C1.04457 15.1649 1.22293 15.405 1.45177 15.574C1.68061 15.743 1.94966 15.8333 2.2249 15.8333H17.7751C18.0503 15.8333 18.3194 15.743 18.5482 15.574C18.777 15.405 18.9554 15.1649 19.0607 14.8839C19.166 14.6029 19.1936 14.2937 19.1399 13.9954C19.0862 13.6971 18.9537 13.4231 18.7591 13.208Z"
            fill="#1F2A37"
          />
        </svg>
        <p>{votes}</p>
      </div>
    </div>
  );
};
