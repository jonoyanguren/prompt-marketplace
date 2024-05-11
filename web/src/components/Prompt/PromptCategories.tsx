import { Category } from "../../types";

export const PromptCategories = ({
  categories,
}: {
  categories: Category[];
}) => {
  return (
    <div className="flex gap-2 flex-wrap my-4">
      {categories.map((category) => (
        <p
          key={category._id}
          className="py-1 px-3 rounded-lg text-sm uppercase"
          style={{
            color: category.textColor,
            backgroundColor: category.bgColor,
          }}
        >
          {category.title}
        </p>
      ))}
    </div>
  );
};
