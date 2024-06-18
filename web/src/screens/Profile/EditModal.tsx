import { useTranslation } from "react-i18next";
import { Button, Input, Modal } from "../../components";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { User } from "../../types";
import { useForm } from "../../hooks/useForm";
import FileUploader from "../../components/FileUploader";
import { AuthContext } from "../../contexts/AuthContext";
import { updateUser as updateUserApi } from "../../api/user";

interface UserProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

export const EditModal = ({ open, setOpen, user }: UserProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("info");

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="p-6 flex flex-col">
        <p className="text-2xl text-left font-semibold">
          {t("editModal.title")}
        </p>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
        <div className="mt-6">
          {activeTab === "info" ? (
            <InfoForm user={user} close={() => setOpen(false)} />
          ) : (
            <LinksForm user={user} close={() => setOpen(false)} />
          )}
        </div>
      </div>
    </Modal>
  );
};

const Tabs = ({
  activeTab,
  setActiveTab,
  t,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  t: any;
}) => (
  <div className="border-b border-gray-200 dark:border-gray-700 mt-4">
    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      {["info", "links"].map((tab) => (
        <li key={tab} className="me-2">
          <button
            onClick={() => setActiveTab(tab)}
            className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${
              activeTab === tab
                ? "text-indigo-600 border-indigo-600 dark:text-indigo-500 dark:border-indigo-500"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            } group`}
          >
            {t(`editModal.${tab}Menu`)}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const InfoForm = ({ user, close }: { user: User; close: () => void }) => {
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState(user.avatar);
  const { updateUser } = useContext(AuthContext);
  const { form, formFields } = useForm({
    name: user.name,
    bio: user.bio,
  });

  const changeUserAvatar = (url: string) => {
    updateUser({ ...user, avatar: url });
    setAvatar(url);
  };

  const doUpdateUser = async () => {
    try {
      await updateUserApi({
        userId: user._id,
        user: { ...form, avatar },
      });

      updateUser({ ...user, ...form, avatar });
      enqueueSnackbar(t("editModal.success"), { variant: "success" });
      close();
    } catch (error) {
      console.error("Error updating the user:", error);
    }
  };

  return (
    <div>
      <p className="text-lg text-left font-thin mb-4">
        {t("editModal.uploadYourPicture")}
      </p>
      <div className="flex items-start">
        <img
          className="w-20 h-20 rounded-full mr-4"
          src={`${avatar}?${Date.now()}`}
          alt="Avatar"
        />
        <div className="text-left ml-4">
          <FileUploader
            fileName={`${user._id}-avatar`}
            callback={changeUserAvatar}
          >
            <p className="text-indigo-600 cursor-pointer">
              {t("editModal.updatePhotoLink")}
            </p>
          </FileUploader>
          <p>{t("editModal.updatePhotoText")}</p>
        </div>
      </div>
      <hr className="my-6" />
      <div>
        <Input className="mt-6" {...formFields("name")} />
        <Input type="textarea" className="mt-4" {...formFields("bio")} />
        <Button
          className="w-full mt-4"
          onClick={doUpdateUser}
          disabled={!form.name && !form.bio}
        >
          {t("editModal.save")}
        </Button>
      </div>
    </div>
  );
};

const LinksForm = ({ user, close }: { user: User; close: () => void }) => {
  const { t } = useTranslation();
  const { updateUser } = useContext(AuthContext);
  const { form, formFields } = useForm({
    linkedin: user.linkedin || "",
    twitter: user.twitter || "",
    web: user.web || "",
  });

  const doUpdateUser = async () => {
    try {
      await updateUserApi({
        userId: user._id,
        user: form,
      });

      updateUser({ ...user, ...form });
      enqueueSnackbar(t("editModal.success"), { variant: "success" });
      close();
    } catch (error) {
      console.error("Error updating the user:", error);
    }
  };

  return (
    <div>
      <p className="text-lg text-left mb-2">{t("editModal.linkedin")}</p>
      <Input className="mb-6" {...formFields("linkedin")} />

      <p className="text-lg text-left mb-2">{t("editModal.twitter")}</p>
      <Input className="mb-6" {...formFields("twitter")} />

      <p className="text-lg text-left mb-2">{t("editModal.web")}</p>
      <Input className="mb-6" {...formFields("web")} />
      <Button
        className="w-full mt-4"
        onClick={doUpdateUser}
        disabled={!form.linkedin && !form.twitter && !form.web}
      >
        {t("editModal.save")}
      </Button>
    </div>
  );
};
