import { User } from "../../types";

export const ProfileContent = ({ user }: { user: User | null }) => {
  if (!user) return null;
  return (
    <div className="text-left py-12 bg-white px-8 shadow rounded-xl mt-8">
      <div className="text-gray-500">{user.bio}</div>
      <hr className="my-6 w-1/3" />
      <div>
        {user.linkedin && (
          <a
            href={user.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500"
          >
            {user.linkedin}
          </a>
        )}
      </div>
      <div>
        {user.twitter && (
          <a
            href={user.twitter}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500"
          >
            {user.twitter}
          </a>
        )}
      </div>
      <div>
        {user.web && (
          <a
            href={user.web}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500"
          >
            {user.web}
          </a>
        )}
      </div>
    </div>
  );
};
