import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const validateJWT = (request, response, next ) => {
    const token = request.headers.authorization || "";
    if( !token){
      return response.status(401).json({msg: 'Falta el token'});
    }

    try {
        const jwt = token.startsWith("Bearer ") ? token.slice(7): null;        
        const payload = jsonwebtoken.verify(jwt, SECRET_KEY, (error, decoded) => {
            if( error){
                response.status(403).json({ msg: 'Token invalido'});
            }

            request.userId = decoded.id;
            request.rol = decoded.rol;
        })
        req.user = { id: payload.id };
        next();
    } catch (error) {
        response.status(500).json({ msg:'Error del servidor', data: []});
        
    }
}

export { validateJWT };