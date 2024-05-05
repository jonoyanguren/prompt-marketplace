import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    bgColor: { type: String, required: true },
    textColor: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
