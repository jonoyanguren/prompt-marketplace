import { User } from "../../types";
// import { Button } from "../Button";

export const CreatedByCard = ({ author }: { author: User }) => {
  return (
    <div className="p-8 border border-gray-300 rounded-xl bg-white">
      <div className="text-center">
        <img
          className="w-20 h-20 rounded-full mx-auto"
          src={`${author.avatar}?${Date.now()}`}
        />
        <p className="font-medium mt-4">{author.name}</p>
        {/* <p className="text-gray-500 text-sm">6K followers</p> */}

        <p className="text-gray-500 text-sm mt-4">{author.bio}</p>
      </div>
      {/* <Button className="w-full mt-6">Follow</Button> */}
    </div>
  );
};
