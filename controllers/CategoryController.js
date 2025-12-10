import Category from "../models/CategoryModel.js";
import Link from "../models/LinkModel.js";

// TODO валидация
export const createCategory = async (req, res) => {
  try {
    const { name, icon, color } = req.body;

    const newCategory = new Category({
      userId: req.user.id,
      name,
      icon,
      color
    });

    const saved = await newCategory.save();

    res.status(200).json({ msg: "Categoría creada", data: saved });
  } catch (err) {
    res.status(500).json({ msg: "Error al crear categoría", error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user.id });

    const withCounts = await Promise.all(
      categories.map(async (cat) => {
        const count = await Link.countDocuments({ 
          userId: req.user.id,
          categoryId: cat._id 
        });

        return { ...cat._doc, count };
      })
    );

    res.status(200).json({ data: withCounts });
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener categorías", error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    await Category.findOneAndDelete({ _id: id, userId: req.user.id });

    await Link.updateMany(
      { categoryId: id, userId: req.user.id },
      { categoryId: null }
    );

    res.status(200).json({ msg: "Categoría eliminada" });
  } catch (err) {
    res.status(500).json({ msg: "Error al eliminar categoría", error: err.message });
  }
};
