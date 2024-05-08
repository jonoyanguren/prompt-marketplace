import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const PromptItemSkeleton = () => {
  return (
    <div className="p-6 rounded-xl shadow-lg bg-white text-left">
      <div className="flex justify-end mb-8 items-center">
        <Skeleton width={40} className="ml-1" />
      </div>
      <Skeleton height={22} className="font-bold text-lg text-gray-900" />
      <Skeleton height={18} className="text-sm my-2 underline text-gray-800" />
      <Skeleton height={16} className="text-sm font-medium text-gray-500" />
      <div className="flex gap-2 mt-2 flex-wrap">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <Skeleton
              height={16}
              width={80}
              className="text-sm font-medium text-gray-500"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap my-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton
            key={index}
            height={22}
            width={100}
            className="py-1 px-3 rounded-lg text-sm uppercase"
          />
        ))}
      </div>
      <div className="flex gap-2 mt-2 justify-end">
        {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(
          (_, index) => (
            <Skeleton key={index} height={32} width={32} className="w-8" />
          )
        )}
      </div>
    </div>
  );
};
