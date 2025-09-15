import User from "../models/UserModel.js";

const createUser = async (request, response) => {
  try {

    const body = request.body;
    if (!body?.name || !body?.email || !body?.password) {
      return response.status(400).json(({msg: "Los campos name, email y password son obligatorios"}));
    }
    const newUser = new User(body);
    const user = await newUser.save(); 
    
    response.status(200).json({msg: "Usuario creado exitosamente", data: user });
  } catch (error) {
    return response.status(500).json({ msg: "Error del servidor al crear el usuario.",msg: error.message });
  }
};

const getAllUsers = async (request, response) => {
  try {
    const users = await User.find();
    if (!users) {
      return response.status(404).json({msg: "No se encontraron usuarios"});
    }
    response.status(200).json({data: users});
  } catch (error) {
    return response.status(500).json({ msg: "Error del servidor al obtener los usuarios.",msg: error.message });
  }
};

const getUserById = async(request, response) => {
  try {
    const id = request.params.id;
    const user = await User.findById(id);
    if (!user) {
      return response.status(404).json({msg: "No se encontro el usuario."});
    }
    return response.status(200).json({data:user});
  } catch (error) {
    return response.status(500).json({msg: "Error del servidor al obtener el usuario.",msg: error.message});
  }
};

const updateUser = async(request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;

    if (!body?.name || !body?.email || !body?.password) {
      return response.status(400).json(({msg: "Los campos name, email y password son obligatorios"}));
    }
    
    const user = await User.findByIdAndUpdate(id, body);
    if (!user) {
      return response.status(404).json({msg: "No se encontro el usuario."});
    }
    return response.status(200).json({msg: "Usuario actualizado exitosamente", data:user});

  } catch (error) {
    return response.status(500).json({msg: "Error del servidor al actualizar el usuario.",msg: error.message});
  }
}

const deleteUser = async (request, response) => {
  try {

    const id = request.params.id; 
    const user = await User.findByIdAndDelete(id);

  if (!user) {
    return response.status(404).json({msg: "No se encontro el usuario."});
  }

    return response.status(200).json({msg: "Usuario eliminado exitosamente", data:user});
  } catch(error) {
    return response.status(500).json({msg: "Error del servidor al eliminar el usuario.",msg: error.message});
  }
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };