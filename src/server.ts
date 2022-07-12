import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { port } from './config';
import usersRoutes from './routes/users.routes';
import todoRoutes from './routes/todos.routes';
import taskRoutes from './routes/task.routes';
import {verifyToken} from './middleware/auth';
import {databaseInit} from "./database";

const app = express();
databaseInit()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/info',verifyToken, async (req: Request, res: Response) => {
    res.status(200).json({
        message: "hello <3",
        time: new Date().toLocaleString()
    });
});

app.use('/users', usersRoutes);
app.use('/todos', todoRoutes);
app.use('/task', taskRoutes);


const server = http.createServer(app);
server.listen(port, () => {
    console.log(`API started at http://localhost:${port}`);
});