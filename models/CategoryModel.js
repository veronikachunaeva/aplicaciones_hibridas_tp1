import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  icon: { type: String, default: "" },
  color: { type: String, default: "#ffffff" }
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
