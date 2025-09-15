import Note from "../models/NoteModel.js";

const createNote = async (request, response) => {
  try {
    const body = request.body;
    
    if (!body?.title || !body?.description || !body?.status || !body?.priority) {
      return response.status(400).json({msg: "El campos título, descripción, estado y prioridad son obligatorios"});
    }
    
    const newNote = new Note(body);
    const note = await newNote.save(); 
    
    response.status(200).json({msg: "Nota creada exitosamente", data: note });
  } catch (error) {
    return response.status(500).json({ msg: "Error del servidor al crear la nota.", error: error.message });
  }
};

const getAllNotes = async (request, response) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    
    if (!notes || notes.length === 0) {
      return response.status(404).json({msg: "No se encontraron notas"});
    }
    
    response.status(200).json({data: notes});
  } catch (error) {
    return response.status(500).json({ msg: "Error del servidor al obtener las notas.", error: error.message });
  }
};

const getNoteById = async(request, response) => {
  try {
    const id = request.params.id;
    const note = await Note.findById(id);
    
    if (!note) {
      return response.status(404).json({msg: "No se encontro la nota."});
    }
    
    return response.status(200).json({data: note});
  } catch (error) {
    return response.status(500).json({msg: "Error del servidor al obtener la nota.", error: error.message});
  }
};

const updateNote = async(request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;

    if (!body?.title) {
      return response.status(400).json({msg: "El campo título es obligatorio"});
    }
    
    const note = await Note.findByIdAndUpdate(id, body, { new: true });
    
    if (!note) {
      return response.status(404).json({msg: "No se encontro la nota."});
    }
    
    return response.status(200).json({msg: "Nota actualizada exitosamente", data: note});

  } catch (error) {
    return response.status(500).json({msg: "Error del servidor al actualizar la nota.", error: error.message});
  }
};

const deleteNote = async (request, response) => {
  try {
    const id = request.params.id; 
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return response.status(404).json({msg: "No se encontro la nota."});
    }

    return response.status(200).json({msg: "Nota eliminada exitosamente", data: note});
  } catch(error) {
    return response.status(500).json({msg: "Error del servidor al eliminar la nota.", error: error.message});
  }
};

const filterByStatus = async (request, response) => {
  try {
    const status = request.query.status;
    
    if (!status || status.trim() === '') {
      getAllNotes(request, response);
      return;
    }

    const notes = await Note.find({ 
      status: { 
        $regex: status, 
        $options: 'i'
      }
    }).sort({ createdAt: -1 });
    
    if (!notes || notes.length === 0) {
      return response.status(404).json({ 
        msg: "No se encontraron notas que coincidan con el estado.",
      });
    }

    return response.status(200).json({ 
      success: true,
      searchTerm: status,
      data: notes 
    });
  } catch (error) {
    return response.status(500).json({ 
      msg: "Error del servidor al buscar notas por estado.",
      error: error.message 
    });
  }
};

export { createNote, getAllNotes, getNoteById, updateNote, deleteNote, filterByStatus };