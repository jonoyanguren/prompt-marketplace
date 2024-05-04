import { User } from "../../types";

export const AuthorCard = ({ createdBy }: { createdBy: User }) => {
  return (
    <div className="mt-4">
      <p className="text-slate-800">{createdBy.name}</p>
    </div>
  );
};
