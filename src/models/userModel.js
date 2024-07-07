import pool from '../../database/config.js';
import bcrypt from 'bcryptjs';

export const crearUsuario = async ({ email, password, rol, lenguage }) => {
    try {
        const hashedPassword = bcrypt.hashSync(password, 10); // Ajusta la cantidad de rondas de hashing (10 es un buen valor)
        console.log('Datos recibidos para crear usuario:', email, hashedPassword, rol, lenguage);

        const SQLquery = {
            text: "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *",
            values: [email, hashedPassword, rol, lenguage]
        };

        const result = await pool.query(SQLquery);
        console.log('Resultado de la inserción en la base de datos:', result.rows[0]);

        return result.rows[0];
    } catch (error) {
        console.error('Error al crear usuario en la base de datos:', error);
        throw error;
    }
};

export const obtenerUsuarioCorreo = async (email) => {
    const query = {
        text: 'SELECT * FROM usuarios WHERE email = $1',
        values: [email]
    };
    const result = await pool.query(query);
    return result.rows[0];
};

export const obtenerUsuarioId = async (id) => {
    const query = {
        text: 'SELECT * FROM usuarios WHERE id = $1',
        values: [id]
    };
    const result = await pool.query(query);
    return result.rows[0];
};
