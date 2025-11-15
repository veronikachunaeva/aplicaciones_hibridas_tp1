import Link from "../models/LinkModel.js";

const createLink = async (req, res) => {
  try {
    const { link, comment, description, icon, group } = req.body;

    if (!link) {
      return res.status(400).json({ msg: "El campo link es obligatorio" });
    }

    const newLink = new Link({
      userId: req.user.id,
      link,
      comment,
      description,
      icon,
      group
    });

    const savedLink = await newLink.save();

    res.status(200).json({ msg: "Enlace creado exitosamente", data: savedLink });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor al crear el enlace", error: error.message });
  }
};

const getAllLinks = async (req, res) => {
  try {
    const links = await Link.find({ userId: req.user.id });
    res.status(200).json({ data: links });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener enlaces", error: error.message });
  }
};

const getLinkById = async (req, res) => {
  try {
    const link = await Link.findOne({ _id: req.params.id, userId: req.user.id });
    if (!link) return res.status(404).json({ msg: "No se encontró el enlace" });
    res.json({ data: link });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor", error: error.message });
  }
};

const updateLink = async (req, res) => {
  try {
    const link = await Link.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!link) return res.status(404).json({ msg: "No se encontró el enlace" });
    res.json({ msg: "Enlace actualizado exitosamente", data: link });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor", error: error.message });
  }
};

const deleteLink = async (req, res) => {
  try {
    const link = await Link.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!link) return res.status(404).json({ msg: "No se encontró el enlace" });
    res.json({ msg: "Enlace eliminado exitosamente", data: link });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor", error: error.message });
  }
};

export { createLink, getAllLinks, getLinkById, updateLink, deleteLink };
