export const isAdmin = (req, res, next) => {
  console.log(req.user.rol, "isAdmin");
  if (req.user.rol !== "admin") {
  
    return res.status(403).json({ msg: "Acceso solo para administradores" });
  }
  next();
};