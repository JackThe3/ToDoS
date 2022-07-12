import {Request, Response, Router} from 'express';
import {verifyToken} from '../middleware/auth';
import Task from "../models/task";
import User from "../models/user";
import * as yup from "yup";
import {addTaskSchema} from "../schemas/addTask.schema";

const router = Router();

/**
 * sends list of all tasks
 */
router.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const result = await Task.findAll({include:{all: true}});
        res.status(200).json({ todos: result });
    }
    catch (error){
        res.status(500).json({message: 'server error'})
        console.log(error)
    }
});

/**
 * add new task
 */
router.post('/create',verifyToken ,async (req: Request, res: Response) => {

    let validatedTask: yup.InferType<typeof addTaskSchema>
    try {
        validatedTask = addTaskSchema.validateSync(req.body)
    }
    catch (error){
        res.status(400).json({message: 'wrong request body'})
        return
    }

    const user = await User.findOne({
            include:{all: true},
            where: {
                email: req.body.verifyToken.email
            }
        }
    )
    if (!user){
        res.status(500).send({message:"Task not created"});
        return
    }

    const todo = user.Todos?.find(item => item.name === validatedTask.name);

    if (!todo){
        res.status(400).json({message: "cant add this task, todo does not exist"})
        return
    }
    try {
        await Task.create({...validatedTask, UserId: user.id, TodoId: todo.id})
        res.status(201).json({message: "task added" });
    }
    catch (error){
        res.status(400).json({message: "Task not added"})
    }

});

router.put('/update',verifyToken ,async (req: Request, res: Response) => {
    let validatedTask: yup.InferType<typeof addTaskSchema>
    try {
        validatedTask = addTaskSchema.validateSync(req.body)
    }
    catch (error){
        res.status(400).json({message: 'wrong request body'})
        return
    }

    const user = await User.findOne({
            include:{all: true},
            where: {
                email: req.body.verifyToken.email
            }
        }
    )
    if (!user){
        res.status(500).send({message:"Task not modified"});
        return
    }

    const todo = user.Todos?.find(item => item.name === validatedTask.name);

    if (!todo){
        res.status(400).json({message: "cant modify this task"})
        return
    }
    try {
        await Task.update({...validatedTask}, {where: {title: validatedTask.title}})
        res.status(200).json({message: 'task modified'})
    }
    catch (error){
        res.status(400).json({message: "Task not modified"})
    }

});

export default router;