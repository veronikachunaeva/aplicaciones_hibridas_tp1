export const isAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") {
  
    return res.status(403).json({ msg: "Acceso solo para administradores" });
  }
  next();
};