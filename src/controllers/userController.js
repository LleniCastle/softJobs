import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { crearUsuario, obtenerUsuarioCorreo } from '../models/userModel.js';
import bcrypt from 'bcryptjs'; // Usar bcryptjs en lugar de bcrypt

dotenv.config();

const { JWT_SECRET } = process.env;

export const registrarUsuario = async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body;

        console.log('Datos recibidos en el controlador:', { email, password, rol, lenguage });

        if (!email || !password || !rol || !lenguage) {
            throw new Error('Todos los campos son obligatorios.');
        }

        const nuevoUsuario = await crearUsuario({
            email,
            password,
            rol,
            lenguage
        });

        console.log('Usuario creado:', nuevoUsuario);

        res.status(201).json({ user: nuevoUsuario });
    } catch (error) {
        console.error('Error registrando usuario:', error);
        res.status(400).json({ error: error.message || 'Error interno del servidor' });
    }
};

export const accederUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Datos recibidos en accederUsuario:', { email });

        // Buscar usuario por email en la base de datos
        const user = await obtenerUsuarioCorreo(email);
        console.log('Usuario encontrado:', user);

        // Verificar si el usuario existe y si la contraseña es correcta
        if (!user || !(await bcrypt.compare(password, user.password))) {
            console.log('Credenciales inválidas');
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generado:', token);

        // Enviar token JWT como respuesta
        res.json({ token });
    } catch (error) {
        console.error('Error iniciando sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const obtenerPerfilUsuario = async (req, res) => {
    const { email } = req.user;
    try {
        const user = await obtenerUsuarioCorreo(email);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error obteniendo perfil de usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
