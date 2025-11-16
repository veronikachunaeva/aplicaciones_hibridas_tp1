import Note from "../models/NoteModel.js";

// Создание новой заметки
const createNote = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title || !description || !status || !priority) {
      return res.status(400).json({
        msg: "Los campos título, descripción, estado y prioridad son obligatorios"
      });
    }

    const newNote = new Note({
      userId: req.user.id,
      title,
      description,
      status,
      priority
    });

    const savedNote = await newNote.save();
    res.status(200).json({ msg: "Nota creada exitosamente", data: savedNote });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor al crear la nota", error: error.message });
  }
};

// Получение всех заметок текущего пользователя
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ data: notes });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor al obtener las notas", error: error.message });
  }
};

// Получение заметки по ID (только если она принадлежит пользователю)
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ msg: "No se encontró la nota" });

    res.status(200).json({ data: note });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor al obtener la nota", error: error.message });
  }
};

// Обновление заметки (только если она принадлежит пользователю)
const updateNote = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title) return res.status(400).json({ msg: "El campo título es obligatorio" });

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, description, status, priority },
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ msg: "No se encontró la nota" });

    res.status(200).json({ msg: "Nota actualizada exitosamente", data: updatedNote });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor al actualizar la nota", error: error.message });
  }
};

// Удаление заметки (только если она принадлежит пользователю)
const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!deletedNote) return res.status(404).json({ msg: "No se encontró la nota" });

    res.status(200).json({ msg: "Nota eliminada exitosamente", data: deletedNote });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor al eliminar la nota", error: error.message });
  }
};

// Фильтрация заметок по статусу текущего пользователя
const filterByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    if (!status || status.trim() === "") return getAllNotes(req, res);

    const notes = await Note.find({
      userId: req.user.id,
      status: { $regex: status, $options: "i" }
    }).sort({ createdAt: -1 });

    if (!notes || notes.length === 0) {
      return res.status(404).json({ msg: "No se encontraron notas que coincidan con el estado" });
    }

    res.status(200).json({ success: true, searchTerm: status, data: notes });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor al buscar notas por estado", error: error.message });
  }
};

export { createNote, getAllNotes, getNoteById, updateNote, deleteNote, filterByStatus };
