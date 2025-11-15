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

const filterByGroup = async (req, res) => {
  try {
    const group = req.query.group;

    if (!group || group.trim() === "") {
      return getAllLinks(req, res);
    }

    const links = await Link.find({
      userId: req.user.id, 
      group: { $regex: group, $options: "i" },
    });

    if (!links || links.length === 0) {
      return res.status(404).json({
        msg: "No se encontraron enlaces que coincidan con el grupo.",
      });
    }

    return res.status(200).json({
      success: true,
      searchTerm: group,
      data: links,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error del servidor al buscar enlaces.",
      error: error.message,
    });
  }
};

const filterByLink = async (req, res) => {
  try {
    const link = req.query.link;

    if (!link || link.trim() === "") {
      return getAllLinks(req, res);
    }

    const links = await Link.find({
      userId: req.user.id,
      link: { $regex: link, $options: "i" },
    });

    if (!links || links.length === 0) {
      return res.status(404).json({
        msg: "No se encontraron enlaces que coincidan con el nombre.",
      });
    }

    return res.status(200).json({
      success: true,
      searchTerm: link,
      data: links,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error del servidor al buscar enlaces.",
      error: error.message,
    });
  }
};



export { createLink, getAllLinks, getLinkById, updateLink, deleteLink, filterByGroup, filterByLink };
