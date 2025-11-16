import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const validateJWT = (request, response, next) => {
  const authHeader = request.headers.authorization || "";

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({ msg: "Falta el token" });
  }

  const token = authHeader.slice(7); 

  try {
    const payload = jsonwebtoken.verify(token, SECRET_KEY);

    request.userId = payload.id;
    request.rol = payload.rol;

    next(); 
  } catch (error) {
    return response.status(403).json({ msg: "Token inválido" });
  }
};

export { validateJWT };
