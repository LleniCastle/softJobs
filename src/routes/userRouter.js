import express from 'express';
import { registrarUsuario, accederUsuario, obtenerPerfilUsuario } from '../controllers/userController.js';
import { validacionUsuario, solicitudRegistro, autenticacionToken } from '../middlewares/userValidation.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/usuarios', validacionUsuario, async (req, res) => {
    try {
        console.log('Datos recibidos en la ruta /usuarios:', req.body);
        await registrarUsuario(req, res);
    } catch (error) {
        console.error('Error al manejar la solicitud de registro de usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para login
router.post('/login', solicitudRegistro, async (req, res) => {
    try {
        console.log('Datos recibidos en la ruta /login:', req.body);
        await accederUsuario(req, res);
    } catch (error) {
        console.error('Error al manejar la solicitud de login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para obtener perfil de usuario
router.get('/profile', solicitudRegistro, autenticacionToken, async (req, res) => {
    try {
        console.log('Datos recibidos en la ruta /profile:', req.body);
        await obtenerPerfilUsuario(req, res);
    } catch (error) {
        console.error('Error al manejar la solicitud de perfil de usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;
