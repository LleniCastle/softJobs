import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

const pool = new pg.Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
    allowExitOnIdle: true,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log('Error al conectar a DB:', err);
    } else {
        console.log('🔋 DB-Conectada', res.rows[0].now);
    }
});

export default pool;