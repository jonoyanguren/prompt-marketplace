import { useTranslation } from "react-i18next";
import { Button, Input, Modal } from "../../components";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { User } from "../../types";
import { useForm } from "../../hooks/useForm";
import { updateUser } from "../../api/user";

interface UserProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const EditModal = ({ open, setOpen, user, setUser }: UserProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"info" | "links">("info");

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <InfoForm
            user={user}
            close={() => setOpen(false)}
            setUser={setUser}
          />
        );
      case "links":
        return <LinksForm user={user} />;
      default:
        return <InfoForm user={user} />;
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="p-6 flex flex-col">
        <p className="text-2xl text-left font-semibold">
          {t("editModal.title")}
        </p>
        {/* TABS */}
        <div className="border-b border-gray-200 dark:border-gray-700 mt-4">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="me-2">
              <button
                onClick={() => setActiveTab("info")}
                className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${
                  activeTab === "info"
                    ? "text-indigo-600 border-indigo-600 dark:text-indigo-500 dark:border-indigo-500"
                    : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                } group`}
              >
                {t("editModal.infoMenu")}
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => setActiveTab("links")}
                className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${
                  activeTab === "links"
                    ? "text-indigo-600 border-indigo-600 dark:text-indigo-500 dark:border-indigo-500"
                    : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                } group`}
              >
                {t("editModal.linksMenu")}
              </button>
            </li>
          </ul>
        </div>
        <div className="mt-6">{renderContent()}</div>
      </div>
    </Modal>
  );
};

const InfoForm = ({
  user,
  close,
  setUser,
}: {
  user: User;
  close: () => void;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}) => {
  const { t } = useTranslation();
  // const [avatar, setAvatar] = useState(user.avatar);
  const { form, formFields, setError } = useForm({
    name: user.name,
    bio: user.bio,
  });

  const doUpdateUser = async () => {
    try {
      await updateUser({
        userId: user._id,
        user: form,
      });
      close();
      setUser({ ...user, ...form });
      enqueueSnackbar(t("editModal.success"), {
        variant: "success",
      });
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
        <img className="w-20 h-20 rounded-full mr-4" src={user.avatar} />
        <div className="text-left ml-4">
          <p className="text-indigo-600 cursor-pointer">
            {t("editModal.updatePhotoLink")}
          </p>
          {/* <FileUploader callback={(url) => setAvatar(url)} /> */}
          <p>{t("editModal.updatePhotoText")}</p>
        </div>
      </div>

      <div className="mt-6">
        <Input className="mt-6" {...formFields("name")} />
        <Input type="textarea" className="mt-4" {...formFields("bio")} />
        <Button
          className="w-full mt-4"
          onClick={() => doUpdateUser()}
          disabled={!form.name && !form.bio}
        >
          {t("editModal.save")}
        </Button>
      </div>
    </div>
  );
};

const LinksForm = ({ user }: { user: User }) => {
  const { t } = useTranslation();
  return <div>LINKSSS</div>;
};
