import express from 'express';
import cors from 'cors';
import { logger } from 'logger-express'; // Asumiendo que 'logger-express' es un módulo que proporciona un middleware de registro
import path from 'path';
import 'dotenv/config'; 
import userRoutes from './src/routes/userRouter.js'; // Asegúrate de que la ruta a useRoutes.js sea correcta y completa

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger()); // Middleware de logging utilizando 'logger-express'

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`Request to ${req.path}`);
    next();
});

app.use('/api', userRoutes); // Asegúrate de que '/api' sea la ruta base correcta para userRoutes

app.listen(PORT, () => {
    console.log(`¡Servidor encendido! http://localhost:${PORT}`);
});
