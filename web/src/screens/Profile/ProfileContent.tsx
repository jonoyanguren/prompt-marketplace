import { Title } from "../../components";
import { User } from "../../types";
import FileUploader from "../../components/FileUploader";
import { updateUser as updateUserApi } from "../../api/user";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export const ProfileContent = ({ user }: { user: User | null }) => {
  const { updateUser: updateUserContext } = useContext(AuthContext);

  const saveUser = async (url: string) => {
    if (!user) return;
    try {
      await updateUserApi({
        userId: user._id,
        user: { avatar: url },
      });

      updateUserContext({ ...user, avatar: url });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) return null;
  return (
    <div className="mt-12">
      <Title>Profile</Title>
      <FileUploader fileName={`${user._id}-avatar`} callback={saveUser} />
    </div>
  );
};
