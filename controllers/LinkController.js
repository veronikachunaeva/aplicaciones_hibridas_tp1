import Link from "../models/LinkModel.js";

const createLink = async (request, response) => {
  try {

    const body = request.body;
    if (!body?.link ) {
      return response.status(400).json(({msg: "Los campo enlace es obligatorio"}));
    }
    const newLink = new Link(body);
    const link = await newLink.save(); 
    
    response.status(200).json({msg: "Enlace creado exitosamente", data: link });
  } catch (error) {
    return response.status(500).json({ msg: "Error del servidor al crear el enlace.",msg: error.message });
  }
};

const getAllLinks = async (request, response) => {
  try {
    const links = await Link.find();
    if (!links) {
      return response.status(404).json({msg: "No se encontraron enlaces"});
    }
    response.status(200).json({data: links});
  } catch (error) {
    return response.status(500).json({ msg: "Error del servidor al obtener los enlaces.",msg: error.message });
  }
};

const getLinkById = async(request, response) => {
  try {
    const id = request.params.id;
    const link = await Link.findById(id);
    if (!link) {
      return response.status(404).json({msg: "No se encontro el enlace."});
    }
    return response.status(200).json({data:link});
  } catch (error) {
    return response.status(500).json({msg: "Error del servidor al obtener el enlace.",msg: error.message});
  }
};

const updateLink = async(request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;

    if (!body?.link) {
      return response.status(400).json(({msg: "Los campo link es obligatorio"}));
    }
    
    const link = await Link.findByIdAndUpdate(id, body);
    if (!link) {
      return response.status(404).json({msg: "No se encontro el enlace."});
    }
    return response.status(200).json({msg: "Enlace actualizado exitosamente", data:user});

  } catch (error) {
    return response.status(500).json({msg: "Error del servidor al actualizar el enlace.",msg: error.message});
  }
}

const deleteLink = async (request, response) => {
  try {
    const id = request.params.id; 
    const link = await User.findByIdAndDelete(id);

  if (!user) {
    return response.status(404).json({msg: "No se encontro el enlace."});
  }

    return response.status(200).json({msg: "Enlace eliminado exitosamente", data:link});
  } catch(error) {
    return response.status(500).json({msg: "Error del servidor al eliminar el enlace.",msg: error.message});
  }
};

const filterByLink = async (request, response) => {
  try {
      const link= request.query.link;
      if (!link || link.trim() === '') {
        getAllLinks(request, response);
        return;
      }

      const links = await Link.find({ 
        link: { 
          $regex: link, 
          $options: 'i'
        }
      });
      
      if (!links || links.length === 0) {
        return response.status(404).json({ 
          msg: "No se encontraron enlaces que coincidan con el nombre.",
        });
      }

      return response.status(200).json({ 
        success: true,
        searchTerm: link,
        data: links 
      });
  } catch (error) {
    return response.status(500).json({ 
      msg: "Error del servidor al buscar enlaces.",
      error: error.message 
    });
  }
};
const filterByGroup = async (request, response) => {
  try {
      const group = request.query.group;
      if (!group || group.trim() === '') {
        getAllLinks(request, response);
        return;
      }

      const links = await Link.find({ 
        group: { 
          $regex: group, 
          $options: 'i'
        }
      });
      
      if (!links || links.length === 0) {
        return response.status(404).json({ 
          msg: "No se encontraron enlaces que coincidan con el nombre.",
        });
      }

      return response.status(200).json({ 
        success: true,
        searchTerm: group,
        data: links 
      });
  } catch (error) {
    return response.status(500).json({ 
      msg: "Error del servidor al buscar enlaces.",
      error: error.message 
    });
  }
};

export { createLink, getAllLinks, getLinkById, updateLink, deleteLink, filterByLink, filterByGroup };