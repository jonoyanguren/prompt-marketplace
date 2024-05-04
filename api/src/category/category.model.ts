import mongoose from "mongoose";

interface CategoryTypes {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema<CategoryTypes>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Category = mongoose.model<CategoryTypes>("Category", categorySchema);

export default Category;
