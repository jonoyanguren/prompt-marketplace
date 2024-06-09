import { User } from "../../types";

export const ProfileContent = ({ user }: { user: User | null }) => {
  if (!user) return null;
  return <div className="mt-12 text-left text-gray-500">{user.bio}</div>;
};
