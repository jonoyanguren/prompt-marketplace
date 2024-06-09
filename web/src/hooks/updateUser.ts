import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { updateUser as updateUserApi } from "../api/user";
import { enqueueSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

const useUpdateUser = () => {
  const { t } = useTranslation();
  const { updateUser } = useContext(AuthContext);

  const doUpdateUser = async (
    userId: string,
    updatedFields: Partial<User>,
    close: () => void
  ) => {
    try {
      const updatedUser = await updateUserApi({
        userId,
        user: updatedFields,
      });

      updateUser(updatedUser);
      enqueueSnackbar(t("editModal.success"), { variant: "success" });
      close();
    } catch (error) {
      console.error("Error updating the user:", error);
    }
  };

  return { doUpdateUser };
};

export default useUpdateUser;
