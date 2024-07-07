import jwt from 'jsonwebtoken';

export const validacionUsuario = (req, res, next) => {
    const { email, password, rol, lenguage } = req.body;

    if (!email || !password || !rol || !lenguage) {
        return res.status(400).json({ error: "El email, password, rol y lenguage deben ser completados." });
    }

    next();
};

export const autenticacionToken = (req, res, next) => {
    const token = req.headers['autorizacion'];
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
};

export const solicitudRegistro = (req, res, next) => {
    console.log(`Recibida petición a la ruta: ${req.url}`);
    next();
};
