import mongoose from "mongoose";

interface CategoryTypes {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema<CategoryTypes>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = mongoose.model<CategoryTypes>("Category", categorySchema);

export default Category;
